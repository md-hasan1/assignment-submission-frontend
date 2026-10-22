import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import ReduxProvider from "@/redux/Provider";
import Loading from "@/components/Others/Loader/Loading";
import {
  inter,
  openSans,
  playfair,
  roboto,
} from "@/fonts/Fonts";

export const metadata: Metadata = {
  title: "ProjectHub | Submission & Review Workspace",
  description: "One focused space for students to share their work and mentors to provide timely decisions.",
};

import { SubmissionProvider } from "@/context/SubmissionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${openSans.variable} ${playfair.variable} ${roboto.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            <SubmissionProvider>
              {children}
              <Toaster richColors position="top-right" />
            </SubmissionProvider>
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}

