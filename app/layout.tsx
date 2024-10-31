import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventGuru",
  description:
    "EventGuru is a platform for event management. It allows you to create, manage, and promote events. It also allows you to sell tickets and manage attendees.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <nav>
            <a href="/">Home</a>
            <SignedIn>
              <a href="/events/my-events">My Events</a> {/* Visible if logged in */}
            </SignedIn>
            <SignedOut>
              <a href="/login">Login</a> {/* Visible if logged out */}
            </SignedOut>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
