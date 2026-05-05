import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://sonukumarsingh.tech";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Sonu Kumar — Full Stack Developer",
    template: "%s | Sonu Kumar",
  },

  description:
    "CS student & full-stack developer specialising in the MERN stack, Next.js, and AI integrations. Building efficient, user-friendly web applications.",

  keywords: [
    "Sonu Kumar",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "Web Developer Portfolio",
    "CS Student",
    "JavaScript Developer",
  ],

  authors: [{ name: "Sonu Kumar", url: BASE_URL }],
  creator: "Sonu Kumar",
  publisher: "Sonu Kumar",

  /* ── Canonical URL ── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ── */
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Sonu Kumar — Portfolio",
    title: "Sonu Kumar — Full Stack Developer",
    description:
      "CS student & full-stack developer specialising in the MERN stack, Next.js, and AI integrations. Building efficient, user-friendly web applications.",
    images: [
      {
        url: "/og-image.png",   // place a 1200×630 image at /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Sonu Kumar — Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
  },

  /* ── Twitter / X card ── */
  twitter: {
    card: "summary_large_image",
    title: "Sonu Kumar — Full Stack Developer",
    description:
      "CS student & full-stack developer specialising in the MERN stack, Next.js, and AI integrations.",
    images: ["/og-image.png"],
    creator: "@sonukumar",   // update with your real handle if you have one
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  /* ── Web manifest ── */
  // manifest: "/site.webmanifest",

  /* ── Theme colour (browser chrome on mobile) ── */
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#F6F4EF" },
  //   { media: "(prefers-color-scheme: dark)",  color: "#0E0E0E" },
  // ],
};

/* ── JSON-LD structured data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sonu Kumar",
  url: BASE_URL,
  jobTitle: "Full Stack Developer",
  description:
    "CS student and full-stack developer specialising in the MERN stack, Next.js, and AI integrations.",
  sameAs: [
    "https://github.com/SonuKumar7668",
    "https://sonukumar1.netlify.app",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Java",
    "C++",
    "Tailwind CSS",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}