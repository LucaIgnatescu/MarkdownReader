"use client";
import type { Session } from "next-auth";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function SessionData(){

  const {data:session} = useSession();
  console.log(session);

  return (
    <p>{session?.toString()?? "Not logged in"}</p>
  )
}