"use client";
import { Button } from "@mui/material";
import React from "react";
import { useUserStore } from "@/stores/user/user.store";

const SignIn = (): JSX.Element => {
  const user = useUserStore((state) => state.user);
  const signIn = useUserStore((state) => state.signIn);
  const handleClick = () => {
    signIn({
      token: "1123",
      user: {
        id: 1,
        email: "user@example.com",
        name: "user",
        status: true,
        role: "admin",
      },
    });
  };
  return (
    <div>
      sdsd
      <Button onClick={handleClick}>Click</Button>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
};

export default SignIn;
