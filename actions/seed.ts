"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";
import { Prisma } from "@prisma/client"; // Import Prisma types

const ACCOUNT_ID = "f4118f5f-db73-4f36-9c4c-e4733b330be1";
const USER_ID = "7055a258-6200-4b54-ba79-923d28fdaa4e";

// Categories with their typical amount ranges
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "allowance", range: [500, 2000] }, 
    { name: "side-hustle", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "cashbacks", range: [50, 500] }, 
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "food-groceries", range: [200, 600] }, 
    { name: "food-delivery", range: [100, 400] },  
    { name: "transportation", range: [100, 500] },
    { name: "utilities", range: [100, 300] },
    { name: "socializing-nightlife", range: [200, 800] },
    { name: "shopping-fashion", range: [300, 1000] }, 
    { name: "inv-mutual-funds", range: [500, 1500] }, 
  ],
};

// 1. Add types to helper function parameters
function getRandomAmount(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// 2. Add types to helper function parameters
function getRandomCategory(type: "INCOME" | "EXPENSE") {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    // Generate 90 days of transactions
    const transactions: any[] = []; // Typed as any[] to allow easy object creation
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% chance of income, 60% chance of expense
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${
            type === "INCOME" ? "Received" : "Paid for"
          } ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Insert transactions in batches and update account balance
    // 3. Explicitly type 'tx' as Prisma.TransactionClient
    await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // Clear existing transactions
      await tx.transaction.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });

      // Insert new transactions
      await tx.transaction.createMany({
        data: transactions,
      });

      // Update account balance
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: (error as Error).message };
  }
}