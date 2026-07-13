import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "FastPass Tunisia",
  description: "Cross-brand loyalty and discovery platform for Tunisian fast food."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
