"use client";

import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const value = {
    postContent,
    setPostContent,
    isPosting,
    setIsPosting,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
