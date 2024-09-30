"use client"; // Mark this file as a Client Component

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function ClientLayout({ children }) {
  // Create a query client instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
