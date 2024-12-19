"use client";
import './globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from 'next/link';
import { ReactNode, useState } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="bg-[#202c37] text-white dark:text-gray-900 dark:bg-white flex flex-col item-center">
        <QueryClientProvider client={queryClient}>
          <nav className="px-8 md:px-12 py-4 md:py-6 bg-[#2b3945] dark:bg-white w-[100%] items-center shadow fixed">
            <div className="flex justify-between">
              <Link href={"/"} className="text-xl md:text-3xl font-bold">
                <h1 >Where in the world?</h1>
              </Link>
              {/* <Toggle /> */}
            </div>
          </nav>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
