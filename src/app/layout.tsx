import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lawnchair 14 - Pixel Launcher Recreation',
  description: 'Pixel-perfect Lawnchair Launcher recreation in React/Next.js with Material You dynamic theming and gestures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#090b0e] flex flex-col justify-center items-center">
        {children}
      </body>
    </html>
  );
}
