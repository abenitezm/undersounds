'use client'

import NavigationView from "@/views/NavigationView";
import { useSearchParams } from "next/navigation";

export default function NavigationPage() {
  const searchParams = useSearchParams();

  return <NavigationView searchParams={searchParams} />;
}
