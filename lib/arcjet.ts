import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  // Add || "" to ensure it is always a string, or use ! if you are sure it exists
  key: process.env.ARCJET_KEY || "", 
  characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    // Rate limiting specifically for collection creation
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 collections
      interval: 3600, // per hour
      capacity: 10, // maximum burst capacity
    }),
  ],
});

export default aj;