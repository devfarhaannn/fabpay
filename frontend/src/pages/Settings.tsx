import { DashboardLayout } from "../components/layout/DashboardLayout";

import { AppearanceCard } from "../components/settings/AppearanceCard";
import { NotificationCard } from "../components/settings/NotificationCard";
import { PrivacyCard } from "../components/settings/PrivacyCard";
import { DangerZone } from "../components/settings/DangerZone";
import { SecurityCard } from "../components/profile/SecurityCard";

export const Settings = () => {
  return (
    <DashboardLayout title="Settings">

      <div className="space-y-6">

        <AppearanceCard />

        <NotificationCard />

        <PrivacyCard />

        <SecurityCard/>

        <DangerZone />

      </div>

    </DashboardLayout>
  );
};