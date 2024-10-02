"use client";
import { Button } from "@mui/material";
import React from "react";
import { useUserStore } from "@/stores/user/user.store";
import { useRouter } from "next/navigation";

const SignIn = (): JSX.Element => {
  const user = useUserStore((state) => (state.user));
  const router = useRouter()
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
  const handleClickUser = () => {
    signIn({
      token: "1123",
      user: {
        id: 1,
        email: "user@example.com",
        name: "user",
        status: true,
        role: "user",
      },
    });
  };
  return (
    <div>
      sdsd
      <Button onClick={handleClick}>Click admin</Button>
      <Button onClick={handleClickUser}>Click user</Button>
      <Button onClick={()=> router.push("/admin/products") }>navigate</Button>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
};

export default SignIn;
