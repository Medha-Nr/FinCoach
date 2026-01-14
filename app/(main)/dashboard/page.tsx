import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getUserTransactions } from "@/actions/transaction";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TransactionOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accountsResult, transactionsResult] = await Promise.all([
    getUserAccounts(),
    getUserTransactions(),
  ]);

  // 1. Serialize Accounts
  // Convert Decimal balance to a plain number
  const accounts = accountsResult.map((account) => ({
    ...account,
    balance: Number(account.balance) || 0,
  }));

  // 2. Serialize Transactions
  // Convert Decimal amount to a plain number AND remove potential nested relations
  const transactions = (transactionsResult.data || []).map((transaction) => {
    // Create a plain object
    const plainTransaction = {
      ...transaction,
      amount: Number(transaction.amount) || 0,
    };

    
    if ("account" in plainTransaction) {
      
      delete plainTransaction.account;
    }

    return plainTransaction;
  });

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* Transaction Overview */}
      <TransactionOverview
        accounts={accounts}
        transactions={transactions}
      />

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 flex flex-col items-center justify-center p-5 h-full rounded-lg">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}