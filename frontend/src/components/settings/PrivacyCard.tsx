import {
  Eye,
  Database,
  UserCheck,
} from "lucide-react";

export const PrivacyCard = () => {
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
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Privacy
      </h2>

      <div className="space-y-5">

        {/* Profile Visibility */}

        <PrivacyRow
          icon={
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <Eye className="text-blue-600 dark:text-blue-400" />
            </div>
          }
          title="Profile Visibility"
          description="Control who can view your profile."
          badge="Private"
        />

        {/* Data Sharing */}

        <PrivacyRow
          icon={
            <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-900/30">
              <Database className="text-violet-600 dark:text-violet-400" />
            </div>
          }
          title="Data Sharing"
          description="Manage how your information is used."
          badge="Manage"
        />

        {/* Activity Status */}

        <PrivacyRow
          icon={
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <UserCheck className="text-emerald-600 dark:text-emerald-400" />
            </div>
          }
          title="Activity Status"
          description="Choose whether others can see when you're active."
          badge="On"
        />

      </div>
    </div>
  );
};

interface PrivacyRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

const PrivacyRow = ({
  icon,
  title,
  description,
  badge,
}: PrivacyRowProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-none last:pb-0 dark:border-slate-700">

      <div className="flex items-center gap-4">
        {icon}

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <span
        className="
          rounded-full
          bg-slate-100
          px-3
          py-1
          text-sm
          font-medium
          text-slate-700
          dark:bg-slate-800
          dark:text-slate-300
        "
      >
        {badge}
      </span>

    </div>
  );
};