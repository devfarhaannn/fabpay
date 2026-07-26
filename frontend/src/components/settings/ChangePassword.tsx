// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Lock } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//     changePasswordSchema,
//     type ChangePasswordFormData,
// } from "../../schemas/changePassword.schema";

// import { changePassword } from "../../services/user.service";

// export const ChangePasswordCard = () => {
//     const [loading, setLoading] = useState(false);

//     const [showCurrentPassword, setShowCurrentPassword] =
//         useState(false);

//     const [showNewPassword, setShowNewPassword] =
//         useState(false);

//     const [showConfirmPassword, setShowConfirmPassword] =
//         useState(false);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm<ChangePasswordFormData>({
//         resolver: zodResolver(changePasswordSchema),
//     });

//     const onSubmit = async (
//         data: ChangePasswordFormData
//     ) => {
//         try {
//             setLoading(true);

//             await changePassword({
//                 currentPassword: data.currentPassword,
//                 newPassword: data.newPassword,
//             });

//             toast.success("Password updated successfully.");

//             reset();
//         } catch (error: any) {
//             toast.error(
//                 error?.response?.data?.message ??
//                 "Failed to update password."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

//             {/* Header */}

//             <div className="mb-8 flex items-start gap-4">
//                 <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
//                     <Lock className="h-6 w-6 text-blue-600" />
//                 </div>

//                 <div>
//                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                         Change Password
//                     </h2>

//                     <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                         Update your password to keep your FabPay account secure.
//                     </p>
//                 </div>
//             </div>

//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="space-y-6"
//             >
//                 {/* Current Password */}

//                 <div>
//                     <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
//                         Current Password
//                     </label>

//                     <div className="relative">
//                         <input
//                             type={showCurrentPassword ? "text" : "password"}
//                             {...register("currentPassword")}
//                             className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-blue-900/40"
//                         />

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowCurrentPassword(!showCurrentPassword)
//                             }
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
//                         >
//                             {showCurrentPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>
//                     </div>

//                     {errors.currentPassword && (
//                         <p className="mt-2 text-sm text-red-500">
//                             {errors.currentPassword.message}
//                         </p>
//                     )}
//                 </div>

//                 {/* New Password */}

//                 <div>
//                     <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
//                         New Password
//                     </label>

//                     <div className="relative">
//                         <input
//                             type={showNewPassword ? "text" : "password"}
//                             {...register("newPassword")}
//                             className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-blue-900/40"
//                         />

//                         <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
//                         >
//                             {showNewPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>
//                     </div>

//                     {errors.newPassword && (
//                         <p className="mt-2 text-sm text-red-500">
//                             {errors.newPassword.message}
//                         </p>
//                     )}
//                 </div>

//                 {/* Confirm Password */}

//                 <div>
//                     <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
//                         Confirm Password
//                     </label>

//                     <div className="relative">
//                         <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             {...register("confirmPassword")}
//                             className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-blue-900/40"
//                         />

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowConfirmPassword(!showConfirmPassword)
//                             }
//                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
//                         >
//                             {showConfirmPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>
//                     </div>

//                     {errors.confirmPassword && (
//                         <p className="mt-2 text-sm text-red-500">
//                             {errors.confirmPassword.message}
//                         </p>
//                     )}
//                 </div>

//                 {/* Password Tips */}

//                 <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
//                     <h4 className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
//                         Password Requirements
//                     </h4>

//                     <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
//                         <li>• Minimum 6 characters</li>
//                         <li>• At least one letter</li>
//                         <li>• At least one number</li>
//                         <li>• Avoid using old passwords</li>
//                     </ul>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                     {loading ? "Updating Password..." : "Update Password"}
//                 </button>
//             </form>
//         </div>
//     );
// };