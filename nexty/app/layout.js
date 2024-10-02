import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "NEXTY",
  description: "NEXTY - Best place to buy products online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Suspense>
        <main>{children}</main>
      </Suspense>
      </body>
    </html>
  );
}
