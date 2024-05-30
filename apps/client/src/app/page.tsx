"use client";
import CardList from "@/components/cards-list";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <QueryClientProvider client={queryClient}>
        <CardList className="mt-2" />
      </QueryClientProvider>
    </main>
  );
}
