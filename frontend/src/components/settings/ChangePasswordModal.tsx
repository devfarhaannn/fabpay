import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Modal } from "../ui/Modal";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../../schemas/changePassword.schema";
import { changePassword } from "../../services/user.service";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({
  open,
  onClose,
}: ChangePasswordModalProps) => {
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const password = watch("newPassword") || "";

  const hasLength = password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const onSubmit = async (
    data: ChangePasswordFormData
  ) => {
    try {
      setLoading(true);

      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully.");

      reset();

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Password"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Lock className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Secure Your Account
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose a strong password that you don't use
            anywhere else.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Current Password */}

        <PasswordInput
          label="Current Password"
          register={register("currentPassword")}
          error={errors.currentPassword?.message}
          visible={showCurrentPassword}
          toggle={() =>
            setShowCurrentPassword(!showCurrentPassword)
          }
        />

        {/* New Password */}

        <PasswordInput
          label="New Password"
          register={register("newPassword")}
          error={errors.newPassword?.message}
          visible={showNewPassword}
          toggle={() =>
            setShowNewPassword(!showNewPassword)
          }
        />

        {/* Password Strength */}

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
          <p className="mb-3 font-medium text-blue-700 dark:text-blue-400">
            Password Requirements
          </p>

          <div className="space-y-2 text-sm">
            <Requirement
              ok={hasLength}
              text="Minimum 6 characters"
            />

            <Requirement
              ok={hasLetter}
              text="Contains a letter"
            />

            <Requirement
              ok={hasNumber}
              text="Contains a number"
            />
          </div>
        </div>

        {/* Confirm */}

        <PasswordInput
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          visible={showConfirmPassword}
          toggle={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading
            ? "Updating Password..."
            : "Update Password"}
        </button>
      </form>
    </Modal>
  );
};

function PasswordInput({
  label,
  register,
  error,
  visible,
  toggle,
}: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          {...register}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function Requirement({
  ok,
  text,
}: {
  ok: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        ok
          ? "text-green-600"
          : "text-slate-500"
      }`}
    >
      <span>{ok ? "✓" : "•"}</span>

      <span>{text}</span>
    </div>
  );
}