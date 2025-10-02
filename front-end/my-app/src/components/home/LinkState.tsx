"use clinet";
import { useLinkStatus } from "next/link";
import React from "react";

const LinkState = () => {
  const { pending } = useLinkStatus();
  return (
    <span
      className={
        pending
          ? "bg-gray-300 w-full absolute top-0 left-0 right-0 bottom-0 rounded-md animate-ping h-full"
          : ""
      }
    />
  );
};

export default LinkState;
