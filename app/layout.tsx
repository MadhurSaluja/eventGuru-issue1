import type { Metadata } from "next";
import { ClerkProvider, useAuth } from "@clerk/nextjs"; // Updated to use useAuth
import Link from 'next/link';
import "./globals.css";

export const metadata: Metadata = {
  title: "EventGuru",
  description:
    "EventGuru is a platform for event management. It allows you to create, manage, and promote events...",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth(); // Replaced useUser with useAuth

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav>
            <Link href="/">Home</Link>
            {isSignedIn && (
              <Link href="/events/my-events">My Events</Link> // Only visible if logged in
            )}
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
