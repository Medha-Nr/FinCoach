import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "FinCoach", // Unique app ID
  name: "FinCoach",
  retryFunction: async (attempt: number) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});