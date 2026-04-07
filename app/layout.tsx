import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexanderdudar.github.io"),
  title: "Alexander Dudar",
  description:
    "Computer Engineering student at UBC. Software engineer, technical project manager, and derivatives trader.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Alexander Dudar",
    description:
      "Computer Engineering student at UBC. Software engineer, technical project manager, and derivatives trader.",
    url: "https://alexanderdudar.github.io",
    siteName: "Alexander Dudar",
    type: "website",
    images: [
      {
        url: "/headshot.png",
        width: 800,
        height: 600,
        alt: "Alexander Dudar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Dudar",
    description:
      "Computer Engineering student at UBC. Software engineer, technical project manager, and derivatives trader.",
    images: ["/headshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ colorScheme: "light" }}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
