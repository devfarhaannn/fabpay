import {
  Lock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const PrivacyCard = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Security
      </h2>

      <div className="space-y-5">

        <PrivacyRow
          icon={<Lock className="text-indigo-600 dark:text-indigo-400" />}
          title="Change Password"
        />

        <PrivacyRow
          icon={<ShieldCheck className="text-green-600 dark:text-green-400" />}
          title="Two-Factor Authentication"
        />

        <PrivacyRow
          icon={<Smartphone className="text-orange-600 dark:text-orange-400" />}
          title="Trusted Devices"
        />

      </div>

    </div>
  );
};

interface PrivacyRowProps {
  icon: React.ReactNode;
  title: string;
}

const PrivacyRow = ({
  icon,
  title,
}: PrivacyRowProps) => (
  <div className="flex items-center justify-between">

    <div className="flex items-center gap-4">

      {icon}

      <span className="font-medium text-slate-900 dark:text-slate-100">
        {title}
      </span>

    </div>

    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300">
      Soon
    </span>

  </div>
);