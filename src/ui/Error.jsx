import React from "react";
import { useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();
  return (
    <p className="text-red-400 text-3xl"> {error.data || error.message} </p>
  );
}
