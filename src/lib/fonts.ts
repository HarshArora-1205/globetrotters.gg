import { Dela_Gothic_One } from "next/font/google";
import localFont from "next/font/local";

// !--------------- Google Font ------------->
const dela = Dela_Gothic_One({
  weight: ["400"],
  variable: "--font-dela-gothic",
  subsets: ["latin"],
});

// !--------------- Local Font ------------->
// !--------------- cc: Dafont ------------->
const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Thin.ttf",
      weight: "100",
    },
    {
      path: "../../public/fonts/Gilroy-UltraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/fonts/Gilroy-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Gilroy-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Gilroy-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Gilroy-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../../public/fonts/Gilroy-Black.ttf",
      weight: "900",
    },
    {
      path: "../../public/fonts/Gilroy-Heavy.ttf",
      weight: "950",
    },
  ],
  variable: "--font-gilroy",
});

export { dela, gilroy };
