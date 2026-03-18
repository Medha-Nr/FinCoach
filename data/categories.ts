// 1. Define the shape of a Category item
export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string;
  icon: string;
  subcategories?: string[];
}

export const defaultCategories: Category[] = [
  // --- INCOME CATEGORIES ---
  { id: "salary", name: "Salary", type: "INCOME", color: "#22c55e", icon: "Wallet" },
  { id: "allowance", name: "Allowance/Pocket Money", type: "INCOME", color: "#a855f7", icon: "HandCoins" },
  { id: "side-hustle", name: "Side Hustle/Freelance", type: "INCOME", color: "#06b6d4", icon: "Laptop" },
  { id: "investments", name: "Investments", type: "INCOME", color: "#6366f1", icon: "TrendingUp" },
  { id: "cashbacks", name: "Cashbacks & Rewards", type: "INCOME", color: "#eab308", icon: "TicketPercent" },
  { id: "other-income", name: "Other Income", type: "INCOME", color: "#64748b", icon: "Plus" },

  // --- EXPENSE CATEGORIES ---
  // NEEDS (The Essentials) for Survival
  { id: "housing", name: "Rent & PG", type: "EXPENSE", color: "#ef4444", icon: "Home" },
  { id: "food-groceries", name: "Groceries & Essentials", type: "EXPENSE", color: "#84cc16", icon: "ShoppingBasket" },
  { id: "transportation", name: "Transport", type: "EXPENSE", color: "#f97316", icon: "Car" },
  { id: "utilities", name: "Bills & Utilities", type: "EXPENSE", color: "#0ea5e9", icon: "Zap" },
  { id: "debt-emi", name: "EMI & Debt", type: "EXPENSE", color: "#475569", icon: "CreditCard" },
  { id: "health-fitness", name: "Health & Fitness", type: "EXPENSE", color: "#14b8a6", icon: "HeartPulse", subcategories: ["Gym", "Medicines", "Doctor"] },

  // WANTS (The Psychological Leaks) for Lifestyle
  { id: "food-delivery", name: "Food Delivery", type: "EXPENSE", color: "#fb923c", icon: "Truck" },
  { id: "socializing-nightlife", name: "Socializing & Nightlife", type: "EXPENSE", color: "#f43f5e", icon: "GlassWater" },
  { id: "shopping-fashion", name: "Shopping & Fashion", type: "EXPENSE", color: "#ec4899", icon: "ShoppingBag" },
  { id: "hobbies-gear", name: "Hobbies & Gear", type: "EXPENSE", color: "#8b5cf6", icon: "Gamepad2" },
  { id: "entertainment-ott", name: "Entertainment & OTT", type: "EXPENSE", color: "#6366f1", icon: "Film" },
  { id: "gifts", name: "Gifts", type: "EXPENSE", color: "#f472b6", icon: "Gift" },
  { id: "other-expense", name: "Other Expenses", type: "EXPENSE", color: "#94a3b8", icon: "MoreHorizontal" },

  // SAVINGS & INVESTMENTS (20%) for Future or Wealth Building
  { id: "inv-mutual-funds", name: "Mutual Funds (SIP)", type: "EXPENSE", color: "#10b981", icon: "LineChart" },
  { id: "inv-bonds-stocks", name: "Stocks & Bonds", type: "EXPENSE", color: "#34d399", icon: "BarChart3" },
  { id: "sav-emergency", name: "Emergency Fund / FD", type: "EXPENSE", color: "#059669", icon: "ShieldCheck" },
  { id: "inv-gold", name: "Gold & Silver", type: "EXPENSE", color: "#fbbf24", icon: "Gem" },
  { id: "inv-crypto", name: "Crypto & Alts", type: "EXPENSE", color: "#f59e0b", icon: "Coins" },
  { id: "health-term-insurance", name: "Health & Term Insurance", type: "EXPENSE", color: "#0d9488", icon: "ShieldCheck" },
];

export const categoryColors: Record<string, string> = defaultCategories.reduce(
  (acc, category) => {
    acc[category.id] = category.color;
    return acc;
  },
  {} as Record<string, string>
);
