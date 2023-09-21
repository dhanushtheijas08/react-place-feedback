import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

export default function BackButton({ classname }) {
  const navigate = useNavigate();
  return (
    <Button classname={classname} onClick={() => navigate(-1)}>
      Back To List
    </Button>
  );
}
