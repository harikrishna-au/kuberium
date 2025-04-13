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
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // 1. Update user settings
    const { error: settingsError } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        aa_uid: data.customer.id,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.mobile
      }, {
        onConflict: 'user_id'
      });

    if (settingsError) throw settingsError;

    // 2. Store bank accounts
    for (const account of data.accounts) {
      const { error: accountError } = await supabase
        .from('bank_accounts')
        .upsert({
          user_id: user.id,
          bank_name: account.bank,
          account_type: account.type,
          account_number: account.account_id,
          current_balance: account.balance,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'account_number'
        });

      if (accountError) throw accountError;

      // 3. Store transactions
      const transactions = account.transactions.map(tx => ({
        user_id: user.id,
        account_number: account.account_id,
        date: tx.date,
        description: tx.description,
        amount: tx.amount,
        type: tx.type.toLowerCase(),
        category: 'uncategorized',
        source: 'aa_import'
      }));

      if (transactions.length > 0) {
        const { error: txError } = await supabase
          .from('transactions')
          .upsert(transactions, {
            onConflict: 'user_id, account_number, date, amount, description'
          });

        if (txError) throw txError;
      }
    }

    // 4. Create default categories
    const defaultCategories = [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Bills & Utilities',
      'Entertainment',
      'Health & Wellness'
    ];

    const { error: categoryError } = await supabase
      .from('categories')
      .upsert(
        defaultCategories.map(category => ({
          user_id: user.id,
          name: category,
          type: 'expense'
        })),
        { onConflict: 'user_id, name' }
      );

    if (categoryError) throw categoryError;

    // 5. Update user metadata
    const { error: userUpdateError } = await supabase.auth.updateUser({
      data: {
        aa_connected: true
      }
    });

    if (userUpdateError) throw userUpdateError;

    toast.success("AA data successfully imported!");
    return true;

  } catch (error) {
    console.error("Error processing AA data:", error);
    toast.error("Failed to process AA data");
    return false;
  }
};
