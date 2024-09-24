import { Inter, Lusitana } from "next/font/google";

/**
 * Imports the Inter font from Google's font library using Next.js's built-in
 * support for Google fonts.
 *
 * next/font/google is a utility provided by Next.js to easily load Google
 * fonts and optimize them for better performance.
 */

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400"],
  subsets: ["latin"],
});
/**
 * To be used elsewhere in your project (for example, in your components or
 * layout to apply the font to the page or specific elements).
 *
 * By exporting it, you can use this INSTANCE of the Inter font across multiple
 * files without needing to import and configure it again.
 */
