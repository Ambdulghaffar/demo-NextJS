import type { Metadata } from "next";

export function generateMetadata({ params }: {params: {name: string} }): Metadata {
  const title = `Discover ${params.name} - Nutrispark`;
  const description = `Learn all about the nutritional values of ${params.name} on NutriTech. Explore now! `;

  return {
    title,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
