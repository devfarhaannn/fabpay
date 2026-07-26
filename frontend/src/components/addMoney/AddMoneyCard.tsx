import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import { addMoney } from "../../services/account.service";

import { useBalance } from "../../hooks/useBalance";
import { ROUTES } from "../../constants/routes";

export const AddMoneyCard = () => {
  const navigate = useNavigate();

  const { refreshBalance } = useBalance();

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      await addMoney(Number(amount));

      await refreshBalance();

      toast.success("Money added successfully!");

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);

      toast.error("Failed to add money.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Add Money
      </h2>

      <Input
        label="Amount"
        placeholder="Enter amount"
        value={amount}
        onChange={setAmount}
      />

      <div className="mt-6">

        <Button
          label={
            loading
              ? "Adding..."
              : "Add Money"
          }
          loading={loading}
          onClick={handleAddMoney}
        />

      </div>

    </div>
  );
};