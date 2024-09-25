import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  // This will be automatically added to the web app
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "This is a NextJS 14 project with typescript",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh'"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /**
     * By adding Inter to body, the font will be applied in the whole app
     * antialiased (TW): smooths out the font
     */
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
