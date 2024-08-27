"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [key, setKey] = useState(false);

  return !key ? router.push("/client") : router.push("/login");
}
