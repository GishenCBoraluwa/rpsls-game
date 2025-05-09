import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rock Paper Scissors Lizard Spock Game',
  description: 'A gesture-controlled game using computer vision',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}