import { Wallet, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div
      className="
        rounded-3xl
        bg-gradient-to-r
        from-indigo-600
        to-violet-700
        p-5
        sm:p-8
        text-white
        shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-indigo-100 sm:text-base">
            Available Balance
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {formatCurrency(balance)}
          </h1>

          <p className="mt-2 text-sm text-indigo-100 sm:mt-3">
            Updated just now
          </p>
        </div>

        <div className="shrink-0 rounded-2xl bg-white/20 p-3 backdrop-blur-sm sm:p-5">
          <Wallet className="h-8 w-8 sm:h-11 sm:w-11" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-green-200 sm:mt-8 sm:text-base">
        <TrendingUp size={18} className="shrink-0" />
        <span>Your account is active and ready for payments.</span>
      </div>
    </div>
  );
};