"use server";

import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const CheckUser = async (email: string) => {
  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/check-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to verify user status" };
    }

    return res.json();
  } catch (error) {
    console.error("CheckUser error:", error);
    return { success: false, message: "Connection to auth server failed" };
  }
};

export const GetCurrentUser = async () => {
  try {
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") || "";
    const authHeader = reqHeaders.get("authorization") || "";

    const res = await fetch(`${API_URL}/api/auth/current-user`, {
      method: "GET",
      headers: {
        "Cookie": cookieHeader,
        "Authorization": authHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
};
