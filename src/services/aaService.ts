import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AACustomer {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

interface AATransaction {
  txn_id: string;
  date: string;
  type: string;
  description: string;
  amount: number;
  balance_after_txn: number;
}

interface AAAccount {
  account_id: string;
  type: string;
  bank: string;
  balance: number;
  transactions: AATransaction[];
}

interface AAData {
  customer: AACustomer;
  accounts: AAAccount[];
}

export const processAAJsonData = async (jsonData: string): Promise<boolean> => {
  try {
    const data: AAData = JSON.parse(jsonData);
    const userId = 'dummy-user-id'; // Use dummy user id

    // 1. Update user settings
    const { error: settingsError } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        aa_uid: data.customer.id,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.mobile
      }, {
        onConflict: 'user_id'
      });

    if (settingsError) throw settingsError;

    // 2. Instead of bank_accounts table, use a custom store function
    for (const account of data.accounts) {
      // Store account info in a custom format in the expenses table instead
      const { error: accountError } = await supabase
        .from('expenses')
        .upsert({
          user_id: userId,
          amount: account.balance,
          description: `Bank account: ${account.bank} - ${account.type}`,
          category: null,
          date: new Date().toISOString(),
          type: 'account_import',
          payment_method: account.account_id
        });

      if (accountError) throw accountError;

      // 3. Store transactions as expenses
      const transactions = account.transactions.map(tx => ({
        user_id: userId,
        amount: tx.amount,
        description: tx.description,
        date: tx.date,
        type: tx.type.toLowerCase(),
        category: null,
        payment_method: account.account_id
      }));

      if (transactions.length > 0) {
        const { error: txError } = await supabase
          .from('expenses')
          .upsert(transactions, {
            onConflict: 'user_id, date, amount, description'
          });

        if (txError) throw txError;
      }
    }

    // 4. Create default categories
    const defaultCategories = [
      { name: 'Food & Dining', icon: 'utensils', color: '#F59E0B' },
      { name: 'Transportation', icon: 'car', color: '#3B82F6' },
      { name: 'Shopping', icon: 'shopping-bag', color: '#EC4899' },
      { name: 'Bills & Utilities', icon: 'file-invoice', color: '#10B981' },
      { name: 'Entertainment', icon: 'film', color: '#8B5CF6' },
      { name: 'Health & Wellness', icon: 'heart', color: '#EF4444' }
    ];

    const { error: categoryError } = await supabase
      .from('categories')
      .upsert(defaultCategories, { onConflict: 'name' });

    if (categoryError) throw categoryError;

    // 5. Update user metadata (skipped since we're not using auth)
    toast.success("AA data successfully imported!");
    return true;

  } catch (error) {
    console.error("Error processing AA data:", error);
    toast.error("Failed to process AA data");
    return false;
  }
};
