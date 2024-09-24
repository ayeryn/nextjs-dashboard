import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
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
