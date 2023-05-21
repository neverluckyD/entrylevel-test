import React from "react";
import { ErrorProps } from "../interfaces/props";

export default function Error({ error }: ErrorProps) {
  return (
    <div
      className="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg mt-5"
      role="alert"
    >
      <p>{error}</p>
    </div>
  );
}
