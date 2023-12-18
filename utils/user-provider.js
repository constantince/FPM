"use client";

import { createContext } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children, value }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
