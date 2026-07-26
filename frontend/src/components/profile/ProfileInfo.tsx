import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import { updateProfile } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

interface ProfileInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const ProfileInfo = ({
  firstName,
  lastName,
  email,
  phone,
}: ProfileInfoProps) => {
  const { refreshUser } = useAuth();

  const [first, setFirst] = useState(firstName);
  const [last, setLast] = useState(lastName);
  const [phoneValue, setPhoneValue] = useState(phone);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirst(firstName);
    setLast(lastName);
    setPhoneValue(phone);
  }, [firstName, lastName, phone]);

  const handleSave = async () => {
    if (!first.trim() || !last.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      await updateProfile({
        firstName: first,
        lastName: last,
        phone: phoneValue,
      });

      await refreshUser();

      toast.success("Profile updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to update profile."
        );
      } else {
        toast.error("Failed to update profile.");
      }
    } finally {
      setLoading(false);
    }
  };

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
        Personal Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          label="First Name"
          value={first}
          onChange={setFirst}
          placeholder="First Name"
        />

        <Input
          label="Last Name"
          value={last}
          onChange={setLast}
          placeholder="Last Name"
        />

        <Input
          label="Email"
          value={email}
          onChange={() => {}}
          readOnly
          icon="email"
        />

        <Input
          label="Phone"
          value={phone || "Not Added"}
          onChange={() => {}}
          readOnly
        />

      </div>

      <div className="mt-8">
        <Button
          label={
            loading
              ? "Saving..."
              : "Save Changes"
          }
          loading={loading}
          onClick={handleSave}
        />
      </div>

    </div>
  );
};