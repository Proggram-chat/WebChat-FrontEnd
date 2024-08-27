"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [key, setKey] = useState(false);

  useEffect(() => {
    setKey(true);
  }, []);
  return key && router.push("/client");
}
