import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fabpay_notifications";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

const defaultSettings: NotificationSettings = {
  email: true,
  push: false,
  sms: false,
};

export const NotificationCard = () => {
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);

  // Load saved settings when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setSettings({
        email: parsed.email ?? true,
        push: parsed.push ?? false,
        sms: parsed.sms ?? false,
      });
    } catch {
      console.error("Failed to load notification settings.");
    }
  }, []);

  // Save whenever settings change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  const toggle = (
    key: keyof NotificationSettings
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Notifications
      </h2>

      <div className="space-y-5">

        <SettingRow
          title="Email Notifications"
          checked={settings.email}
          onChange={() => toggle("email")}
        />

        <SettingRow
          title="Push Notifications"
          checked={settings.push}
          onChange={() => toggle("push")}
        />

        <SettingRow
          title="SMS Alerts"
          checked={settings.sms}
          onChange={() => toggle("sms")}
        />

      </div>

    </div>
  );
};

interface SettingRowProps {
  title: string;
  checked: boolean;
  onChange: () => void;
}

const SettingRow = ({
  title,
  checked,
  onChange,
}: SettingRowProps) => {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <Bell className="text-indigo-600 dark:text-indigo-400" />

        <span className="font-medium text-slate-900 dark:text-slate-100">
          {title}
        </span>

      </div>

      <button
        onClick={onChange}
        className={`flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
          checked
            ? "bg-green-500"
            : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
            checked
              ? "translate-x-7"
              : "translate-x-1"
          }`}
        />
      </button>

    </div>
  );
};