import Head from "next/head";
import Link from "next/link";

export default function Header({
  title = "NEXTY E-Commerce",
  description = "Discover Amazing Products",
}) {
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

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <header className="bg-gray-600 p-4 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          >
            NEXTY E-Commerce
          </Link>
          <div className="flex space-x-6 text-white">
            {/* Wishlist Link */}
            {/* <Link
              href="/wishlist"
              className="flex items-center space-x-1 hover:text-blue-200 transition duration-300"
            >
              <FaHeart className="text-lg" />
              <span>Wishlist</span>
            </Link> */}
            {/* Cart Link */}
            {/* <Link
              href="/cart"
              className="flex items-center space-x-1 hover:text-blue-200 transition duration-300"
            >
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
            </Link> */}
            {/* Login Link */}
            {/* <Link
              href="/login"
              className="flex items-center space-x-1 hover:text-blue-200 transition duration-300"
            >
              <FaUser className="text-lg" />
              <span>Login</span>
            </Link> */}
          </div>
        </nav>
      </header>
    </>
  );
}
