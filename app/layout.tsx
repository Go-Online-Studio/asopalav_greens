import React from 'react';
import { SmoothScrollProvider } from '../src/components/SmoothScroll';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';

export const metadata = {
  title: 'Asopalav Greens — Luxury Banquet & Party Plot | Vadodara',
  description: 'Editorial luxury wedding estate, sprawling manicured grounds, and pillarless crystal banquet hall in Vadodara, Gujarat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] text-[#2A1C16] antialiased selection:bg-[#721B24] selection:text-[#FAF7F2]">
        <SmoothScrollProvider>
          <div className="min-h-screen flex flex-col">
            <Header
              currentPath="/"
              onNavigate={() => {}}
              onOpenInquiry={() => {}}
            />
            <main className="flex-1 w-full">{children}</main>
            <Footer
              onNavigate={() => {}}
              onOpenInquiry={() => {}}
            />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
