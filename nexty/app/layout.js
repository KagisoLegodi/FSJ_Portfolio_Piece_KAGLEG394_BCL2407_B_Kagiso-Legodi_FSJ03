import { Suspense } from "react";
import "./globals.css";


export const metadata = {
  title: "NEXTY",
  description: "NEXTY - Best place to buy products online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
