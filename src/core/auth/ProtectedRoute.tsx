"use client";

import { useAuthStore } from "@/core/store/AuthStore";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (user) {
    return <>{children}</>;
  } else {
    return null;
  }
}
