"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function submitFeedbackAction(data: { emoji: string; feedback?: string; anonymous: boolean; postId: string }) {
  try {
    const res = await fetch(`${API_URL}/api/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Failed to submit feedback");
      throw new Error(errorText);
    }

    return { success: true };
  } catch (error: any) {
    console.error("submitFeedbackAction error:", error);
    return { success: false, error: error.message || "Failed to submit feedback" };
  }
}
