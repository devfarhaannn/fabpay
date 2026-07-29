import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../ui/Avatar";
import { Skeleton } from "../common/Skeleton";

import { ROUTES } from "../../constants/routes";

import {
  getBeneficiaries,
  type Beneficiary,
} from "../../services/beneficiary.service";

export const Beneficiaries = () => {
  const navigate = useNavigate();

  const [beneficiaries, setBeneficiaries] =
    useState<Beneficiary[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const data = await getBeneficiaries();

        setBeneficiaries(data);
      } catch (error) {
        console.error(
          "Failed to load beneficiaries:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Beneficiaries
        </h2>

        <button
          className="
            text-sm
            font-semibold
            text-indigo-600
            transition
            hover:text-indigo-700
            dark:text-indigo-400
            dark:hover:text-indigo-300
          "
        >
          See All
        </button>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-52 rounded-2xl dark:bg-slate-800" />

          <Skeleton className="h-52 rounded-2xl dark:bg-slate-800" />

          <Skeleton className="h-52 rounded-2xl dark:bg-slate-800" />

          <Skeleton className="h-52 rounded-2xl dark:bg-slate-800" />
        </div>
      ) : beneficiaries.length === 0 ? (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400">
          No beneficiaries yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beneficiaries.map((user) => (
            <div
              key={user.id}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-300
                hover:bg-slate-50
                hover:shadow-xl
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-indigo-500
                dark:hover:bg-slate-700
              "
            >
              <div className="flex justify-center">
                <Avatar
                  name={`${user.firstName} ${user.lastName}`}
                  size={60}
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
                {user.firstName} {user.lastName}
              </h3>

              <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {user.totalTransfers} Transfer
                {user.totalTransfers !== 1 ? "s" : ""}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(ROUTES.TRANSFER, {
                    state: {
                      recipient: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                      },
                    },
                  })
                }
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-indigo-700
                  hover:shadow-lg
                  active:scale-95
                "
              >
                <ArrowRightLeft size={18} />

                Send
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};