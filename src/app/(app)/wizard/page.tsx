"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItineraryDisplay } from "@/components/common/itinerary-display";
// import { MapView } from "@/components/common/map-view";
import { formSchema } from "@/schema/itinerary";
import { tripSchema } from "@/schema/ai";
import { experimental_useObject as useObject } from "ai/react";

export default function WizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [itinerary, setItinerary] = useState<z.infer<typeof tripSchema> | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const { object, submit, isLoading } = useObject({
    schema: tripSchema,
    api: "/api/openai/itinerary",
  });

  useEffect(() => {
    if (object) {
      setItinerary(object as z.infer<typeof tripSchema>);
      console.log(object);
    }
  }, [object]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: searchParams.get("escape") || "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      budget: 1000,
      numberOfPeople: 1,
      travelerType: "solo",
      interests: "",
      accommodationType: "hotel",
      travelMode: "localTransport",
      // ageRange: [18, 65],
      dietaryRestrictions: "nonVegetarian",
      fitnessLevel: "moderate",
      paceOfTravel: "medium",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("running");

    if (!session?.user?.availableCredits || session.user.availableCredits <= 0) {
      toast({
        title: "Insufficient credits",
        description: "Please purchase more credits to generate an itinerary.",
        variant: "destructive",
      });
      return;
    }

    console.log(values);
    const parsedResult = formSchema.safeParse(values);

    if (!parsedResult.success) {
      toast({
        title: "Validation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
      console.error("Validation Errors:", parsedResult.error.errors);
      return;
    }

    setIsGenerating(true);
    try {
      submit(values);

      // Update session
      await update({
        ...session,
        user: {
          ...session.user,
          availableCredits: session.user.availableCredits - 1,
        },
      });

      toast({
        title: "Itinerary being generated",
        description: "Your itinerary is being generated, please wait.",
      });

      setActiveTab("itinerary");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    // Step 1: Basic Information
    <>
      <FormField
        control={form.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Destination</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dateRange"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date Range</FormLabel>
            <DateRangePicker
              initialDateFrom={field.value?.from || new Date()}
              initialDateTo={field.value?.to}
              onUpdate={(range) => field.onChange(range.range)}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numberOfPeople"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of People</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,
    // Step 2: Travel Preferences
    <>
      <FormField
        control={form.control}
        name="travelerType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Travelers</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select traveler type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="solo">Solo</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Interests (comma-separated)</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accommodationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accommodation Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="zostel">Zostel</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="resort">Resort</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="travelMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Travel Mode</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select travel mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="localTransport">Local Transport</SelectItem>
                <SelectItem value="bikeRental">Bike Rental</SelectItem>
                <SelectItem value="carRental">Car Rental</SelectItem>
                <SelectItem value="ownVehicle">Own Vehicle</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,
    // Step 3: Personal Preferences
    <>
      <FormField
        control={form.control}
        name="dietaryRestrictions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dietary Restrictions</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select dietary restrictions" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="eggetarian">Eggetarian</SelectItem>
                <SelectItem value="nonVegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="lactoseIntolerant">
                  Lactose Intolerant
                </SelectItem>
                <SelectItem value="glutenFree">Gluten Free</SelectItem>
                <SelectItem value="jain">Jain</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fitnessLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fitness Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select fitness level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="fit">Fit</SelectItem>
                <SelectItem value="veryFit">Very Fit</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="paceOfTravel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pace of Travel</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pace of travel" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,
  ];

  return (
    <div className="container mx-auto mt-20 min-h-[88vh] bg-mist-blue p-4 text-midnight-blue dark:bg-midnight-blue dark:text-frost-blue">
      <h1 className="mb-4 text-2xl font-bold text-sunset-gold">
        Create Your Itinerary
      </h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Preferences</TabsTrigger>
          <TabsTrigger value="itinerary" disabled={!itinerary}>
            Itinerary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto max-w-md space-y-4 p-4"
            >
              {steps[step]}
              <div className="flex justify-between">
                {step > 0 && (
                  <Button type="button" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                <Button type="submit" disabled={isLoading || isGenerating || step < 2}>
                  {isLoading ? "Generating..." : "Generate Itinerary"}
                </Button>
                {step < steps.length - 1 && (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="itinerary">
          {itinerary && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="order-2 md:order-1">
                {/* <MapView itinerary={itinerary} /> */}
              </div>
              <div className="order-1 md:order-2">
                <ItineraryDisplay isLoading={isLoading} itinerary={object as z.infer<typeof tripSchema>} />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <Button
        variant={"link"}
        onClick={() => router.push("/")}
        className="mx-auto mt-4"
      >
        Back to Home
      </Button>
    </div>
  );
}

