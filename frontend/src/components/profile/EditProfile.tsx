import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRound,
  Mail,
  Phone,
  AtSign,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  profileSchema,
  type ProfileFormData,
} from "../../schemas/profile.schema";

import {
  getProfile,
  updateProfile,
} from "../../services/user.service";

export const EditProfileCard = () => {
  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);

        const user = await getProfile();

        reset({
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          username: user.username ?? "",
          phone: user.phone ?? "",
        });

        setEmail(user.email ?? "");
      } catch (error) {
        toast.error("Failed to load profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [reset]);

  const onSubmit = async (
    data: ProfileFormData
  ) => {
    try {
      setSaving(true);

      const updatedUser =
        await updateProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          phone: data.phone,
        });

      reset({
        firstName: updatedUser.firstName ?? "",
        lastName: updatedUser.lastName ?? "",
        username: updatedUser.username ?? "",
        phone: updatedUser.phone ?? "",
      });

      setEmail(updatedUser.email ?? email);

      toast.success(
        "Profile updated successfully."
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}

      <div className="mb-8 flex items-start gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/30">
          <UserRound className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your personal information and
            account details.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* First + Last Name */}

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              First Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                {...register("firstName")}
                placeholder="First name"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900/30"
              />
            </div>

            {errors.firstName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Last Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                {...register("lastName")}
                placeholder="Last name"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900/30"
              />
            </div>

            {errors.lastName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

        </div>

        {/* Username */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Username
          </label>

          <div className="relative">
            <AtSign
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              {...register("username")}
              placeholder="username"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900/30"
            />
          </div>

          {errors.username && (
            <p className="mt-2 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Email cannot be changed from your profile.
          </p>
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              {...register("phone")}
              type="tel"
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900/30"
            />
          </div>

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Save */}

        <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
};