"use client";

import { Session } from "@/utils";
import { decodeJwt } from "jose";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = createContext({});

export function UserData({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const cookies = new Cookies();
    if (!cookies.get("authToken")) return;
    const token = cookies.get("authToken");
    setUserData(decodeJwt(token));
  }, []);
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export function UserInfo() {
  const userData: Session = useContext(UserContext);

  if (Object.keys(userData).length === 0) {
    return <p>No active session!</p>;
  }
  return (
    <>
      <p>Session data provided.</p>
      <ul>
        {Object.keys(userData).map((k) => (
          <li key={k}>
            {k}: {userData[k as keyof Session]}
          </li>
        ))}
      </ul>
    </>
  );
}

export function SignOutButton() {
  const router = useRouter();

  function signOut() {
    const cookies = new Cookies();
    cookies.remove("authToken");
    router.push("/");
  }

  return (
    <button id="signoutBtn" onClick={signOut}>
      Sign Out
    </button>
  );
}
