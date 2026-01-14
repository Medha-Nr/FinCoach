"use server";

import { Resend } from "resend";
import React from "react";

// 1. Define the input types
interface SendEmailArgs {
  to: string;
  subject: string;
  react: React.ReactNode;
}

export async function sendEmail({ to, subject, react }: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  
  // Optional: Guard clause if API key is missing
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return { success: false, error: "Email configuration error" };
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    // 2. Return the error safely
    return { success: false, error };
  }
}