import { useEffect, useState } from "react";

import { DashboardLayout } from "../components/layout/DashboardLayout";

import { ProfileHeader } from "../components/profile/ProfileHeader";
import { EditProfileCard } from "../components/profile/EditProfile";
import { AccountStats } from "../components/profile/AccountStats";
import { SecurityCard } from "../components/profile/SecurityCard";

import { PageLoader } from "../components/common/PageLoader";

import { useAuth } from "../hooks/useAuth";
import { useBalance } from "../hooks/useBalance";

import { getAnalytics } from "../services/analytics.service";

export const Profile = () => {
  const { user } = useAuth();

  const {
    balance,
    loading: balanceLoading,
  } = useBalance();

  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalBeneficiaries: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analytics = await getAnalytics();

        setStats({
          totalTransactions:
            analytics.totalTransactions,

          totalBeneficiaries:
            analytics.totalBeneficiaries,
        });
      } catch (error) {
        console.error(
          "Failed to load analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading || balanceLoading) {
    return (
      <PageLoader message="Loading Profile..." />
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">

        {/* Page Header */}

        <div>
          <h1 className="text-3xl font-bold text-slate-900 transition-colors duration-300 dark:text-slate-100">
            Profile
          </h1>

          <p className="mt-2 text-slate-500 transition-colors duration-300 dark:text-slate-400">
            Manage your account information and security.
          </p>
        </div>

        {/* Profile Summary */}

        <ProfileHeader
          firstName={user?.firstName ?? ""}
          lastName={user?.lastName ?? ""}
          email={user?.email ?? ""}
        />

        {/* Edit Profile */}

        <EditProfileCard />

        {/* Account Statistics */}

        <AccountStats
          balance={balance}
          transactions={
            stats.totalTransactions
          }
          beneficiaries={
            stats.totalBeneficiaries
          }
        />

        {/* Security */}

        <SecurityCard />

      </div>
    </DashboardLayout>
  );
};