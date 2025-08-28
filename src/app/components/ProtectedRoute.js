"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@mantine/core";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace("/"); 
    } else {
      setCheckingAuth(false);
    }
  }, [token, router]);

  if (checkingAuth) return <div><Spinner /></div>;

  return children;
}
