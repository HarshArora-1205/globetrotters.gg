// components/common/SearchBar.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from "uuid";
import { TripAdvisorResponse, Location } from "@/types/place-search";

const SearchBar = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [search, setSearch] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);

  const { data: searchResults, isLoading, error } = useQuery<TripAdvisorResponse>({
    queryKey: ['locations', search],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(search)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        return response.json();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch search results. Please try again.",
        });
        throw error;
      }
    },
    enabled: search.length > 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const debouncedSetSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setShowDropdown(true);
      }, 300),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  const handleResultClick = (location: Location) => {
    try {
      const randomId = uuidv4();
      router.push(`/escapes/${randomId}?escape=${encodeURIComponent(location.name)}`);
      setShowDropdown(false);
      toast({
        title: "Success",
        description: `Selected destination: ${location.name}`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${e}\nFailed to navigate to the selected destination.`,
      });
    }
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search destinations..."
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        className="border font-bold border-sunset-gold h-12 w-full text-sunset-gold"
      />

      {showDropdown && search.length > 2 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg z-50">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-4 text-red-500">Error fetching results</div>
          ) : searchResults?.data && searchResults.data.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {searchResults.data.slice(0, 5).map((location) => (
                <li
                  key={location.location_id}
                  onClick={() => handleResultClick(location)}
                  className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-500">
                    {location.address_obj.address_string}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
