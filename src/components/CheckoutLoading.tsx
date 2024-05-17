"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { checkAuth } from "@/app/create/design/preview/actions";

function CheckoutLoading({ text, id }: { text: string; id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(!loading);
    checkAuth(id);
  }

  return (
    <div className="w-full mt-6  flex justify-end">
      <Button
        onClick={() => {
          handleClick();
        }}
        disabled={loading}
      >
        {loading && (
          <span>
            <Loader2 className="mr-2 animate-spin" size={16} />
          </span>
        )}
        {text}
        <span>
          <ArrowRight className="ml-2" size={16} />
        </span>
      </Button>
    </div>
  );
}

export default CheckoutLoading;
