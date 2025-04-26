import {Courier_Prime, Inter, Playfair_Display, Syne_Mono} from "next/font/google";

export const InterFont = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const PlayfairDisplayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const SyneMonoFont = Syne_Mono(
  {
    weight: ["400"],
    subsets: ["latin"]
  }
)

export const CourierPrimeFont = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
  weight: ["400"],
})

