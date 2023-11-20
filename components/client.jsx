"use client";
import { useSearchParams, redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtVerify, decodeJwt} from "jose";

export function ErrorMessage() {
  const err = useSearchParams().get("error");
  if (err)
    return (
      <>
        <p>{err}</p>
      </>
    );
}

export const UserContext = createContext({});

export function UserFiles() {
  const files = useContext(UserContext);
}

export function UserData({ children }) {
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

export function TestComponent() {
  const userData = useContext(UserContext);

  if (Object.keys(userData).length === 0) {
    return <p>No active session!</p>;
  }
  return (
    <>
      <p>Session data provided.</p>
      <ul>
        {Object.keys(userData).map(k=> (
          <li key={k}>
            {k} : {userData[k]}
          </li>
        ))}
      </ul>
    </>
  );
}
