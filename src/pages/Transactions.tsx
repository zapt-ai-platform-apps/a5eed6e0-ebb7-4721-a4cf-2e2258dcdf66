import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';

interface Transaction {
  id: number;
  bookTitle: string;
  memberName: string;
  date: string;
}

function Transactions(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions from API...");
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err: unknown) {
        console.error(err);
        Sentry.captureException(err);
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <ul>
        {transactions.map(trans => (
          <li key={trans.id} className="mb-2">
            Book: {trans.bookTitle} | Member: {trans.memberName} | Date: {trans.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;