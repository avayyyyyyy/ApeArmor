"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

function Page() {
  const [configuration, setConfiguration] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configId = localStorage.getItem("configurationId");
    if (configId) {
      setConfiguration(configId);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configuration) {
      localStorage.removeItem("configurationId");
      router.push(`/create/design/preview?id=${configuration}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent dark:border-gray-50 dark:border-t-transparent" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Redirecting...
          </p>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}

export default Page;
