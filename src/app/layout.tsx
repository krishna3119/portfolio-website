import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishna Chaudhary | AI Web Developer • Graphic Designer • Programmer",
  description:
    "Portfolio of Krishna Chaudhary — Computer Science student passionate about AI, full-stack web development (MEAN stack), and digital design. Explore projects, skills, and experience.",
  keywords: [
    "Krishna Chaudhary",
    "portfolio",
    "web developer",
    "AI developer",
    "graphic designer",
    "MEAN stack",
    "Angular",
    "Node.js",
  ],
  authors: [{ name: "Krishna Chaudhary" }],
  openGraph: {
    title: "Krishna Chaudhary — Portfolio",
    description:
      "AI Web Developer | Graphic Designer | Programmer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary font-sans antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
