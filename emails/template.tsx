import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

// 1. Define Types for the Data Props
interface MonthlyReportData {
  month: string;
  stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory: Record<string, number>;
  };
insights?: { label: string; description: string }[];}

interface BudgetAlertData {
  percentageUsed: number;
  budgetAmount: number;
  totalExpenses: number;
  accountName: string;
}

interface EmailTemplateProps {
  userName?: string;
  type: "monthly-report" | "budget-alert";
  data: MonthlyReportData | BudgetAlertData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // This removes the decimals!
  }).format(amount);
};

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data,
}: EmailTemplateProps) {
  if (type === "monthly-report") {
    const reportData = data as MonthlyReportData;
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for {reportData?.month}:
            </Text>

            {/* Main Stats */}
<Section style={styles.statsContainer}>
  <div style={styles.stat}>
    <Text style={styles.text}>Total Income</Text>
    {/* Removed hardcoded ₹ and added formatter */}
    <Text style={styles.heading}>{formatCurrency(reportData?.stats.totalIncome)}</Text>
  </div>
  <div style={styles.stat}>
    <Text style={styles.text}>Total Expenses</Text>
    <Text style={styles.heading}>{formatCurrency(reportData?.stats.totalExpenses)}</Text>
  </div>
  <div style={styles.stat}>
    <Text style={styles.text}>Net</Text>
    <Text style={styles.heading}>
      {/* This calculation often causes decimals, formatCurrency fixes it */}
      {formatCurrency(reportData?.stats.totalIncome - reportData?.stats.totalExpenses)}
    </Text>
  </div>
</Section>

            {/* Category Breakdown */}
            {reportData?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(reportData?.stats.byCategory).map(([category, amount]) => (
  <table 
  key={category} 
  width="100%" 
  style={{ borderBottom: "1px solid #e5e7eb", tableLayout: "fixed" }}
  cellPadding="0" 
  cellSpacing="0"
>
  <tr>
    <td align="left" style={{ padding: "12px 0" }}>
      <Text style={{ ...styles.text, margin: 0 }}>{category}</Text>
    </td>
    <td align="right" style={{ padding: "12px 0" }}>
      <Text style={{ ...styles.text, fontWeight: "bold", margin: 0, textAlign: "right" }}>
        {formatCurrency(amount)}
      </Text>
    </td>
  </tr>
</table>
))}
              </Section>
            )}

            {/* AI Insights */}
            {reportData?.insights && (
             <Section style={styles.section}>
    <Heading style={styles.heading}>FinCoach Insights</Heading>
    {reportData.insights.map((insight, index) => (
      <div key={index} style={{ marginBottom: "16px" }}>
        <Text style={{ margin: 0, fontSize: "15px" }}>
          <span style={{ fontWeight: "bold", color: "#1f2937" }}>
            • {insight.label}:
          </span>
          <span style={{ color: "#4b5563" }}> {insight.description}</span>
        </Text>
      </div>
    ))}
  </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using FinCoach. Keep tracking your finances for better
              financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const alertData = data as BudgetAlertData;
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {alertData?.percentageUsed.toFixed(1)}% of your
              monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>₹{alertData?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>₹{alertData?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ₹{alertData?.budgetAmount - alertData?.totalExpenses}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
  
  return null;
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center", // This will now be accepted
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
