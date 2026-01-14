import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  LucideIcon 
} from "lucide-react";

// 1. Define Interfaces 
export interface FeatureItem {
  icon: LucideIcon; 
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  quote: string;
}

// 2. Stats Data 
export const statsData = [
  { value: "50K+", label: "Active Users" },
  { value: "$2B+", label: "Transactions Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

// 3. Features Data 
export const featuresData: FeatureItem[] = [
  {
    icon: BarChart3, 
    title: "Advanced Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: Receipt,
    title: "Smart Receipt Scanner",
    description: "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: PieChart,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: CreditCard,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: Zap,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// 4. How It Works Data
export const howItWorksData: FeatureItem[] = [
  {
    icon: CreditCard,
    title: "1. Create Your Account",
    description: "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: BarChart3,
    title: "2. Track Your Spending",
    description: "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: PieChart,
    title: "3. Get Insights",
    description: "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// 5. Testimonials Data 
export const testimonialsData: TestimonialItem[] = [
  {
    name: "Sarah Jacobs",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote: "Welth has transformed how I manage my business finances...",
  },
  {
    name: "Aditya Sharma",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Avni Raj",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];