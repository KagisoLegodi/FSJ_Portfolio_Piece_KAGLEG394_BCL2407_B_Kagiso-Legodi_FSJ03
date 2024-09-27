import Head from "next/head";
import Link from "next/link";

/**
 * Header component for setting up page meta information and rendering a navigation bar.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.title="NEXTY E-Commerce"] - The title to be displayed in the browser tab.
 * @param {string} [props.description="Discover Amazing Products"] - The description meta tag for SEO.
 * @returns {JSX.Element} - The rendered Header component.
 */
export default function Header({ title = "NEXTY E-Commerce", description = "Discover Amazing Products" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <header className="bg-gray-300 p-4 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          >
            NEXTY E-Commerce
          </Link>
        </nav>
      </header>
    </>
  );
}
