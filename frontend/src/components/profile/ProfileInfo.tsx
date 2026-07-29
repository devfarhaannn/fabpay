// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// import { Button } from "../ui/Button";
// import { Input } from "../ui/Input";

// import { updateProfile } from "../../services/user.service";
// import { useAuth } from "../../hooks/useAuth";

// interface ProfileInfoProps {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   phone: string;
// }

// export const ProfileInfo = ({
//   firstName,
//   lastName,
//   username,
//   email,
//   phone,
// }: ProfileInfoProps) => {
//   const { refreshUser } = useAuth();

//   const [first, setFirst] = useState(firstName);
//   const [last, setLast] = useState(lastName);

//   const [usernameValue, setUsernameValue] =
//     useState(username);

//   const [phoneValue, setPhoneValue] =
//     useState(phone);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setFirst(firstName);
//     setLast(lastName);
//     setUsernameValue(username);
//     setPhoneValue(phone);
//   }, [
//     firstName,
//     lastName,
//     username,
//     phone,
//   ]);

//   const handleSave = async () => {
//     const cleanFirstName = first.trim();
//     const cleanLastName = last.trim();

//     const cleanUsername = usernameValue
//       .trim()
//       .toLowerCase();

//     const cleanPhone = phoneValue.trim();

 

//     if (cleanFirstName.length < 2) {
//       toast.error(
//         "First name must be at least 2 characters."
//       );
//       return;
//     }

//     if (cleanFirstName.length > 50) {
//       toast.error(
//         "First name cannot exceed 50 characters."
//       );
//       return;
//     }



//     if (cleanLastName.length < 2) {
//       toast.error(
//         "Last name must be at least 2 characters."
//       );
//       return;
//     }

//     if (cleanLastName.length > 50) {
//       toast.error(
//         "Last name cannot exceed 50 characters."
//       );
//       return;
//     }



//     if (cleanUsername.length < 3) {
//       toast.error(
//         "Username must be at least 3 characters."
//       );
//       return;
//     }

//     if (cleanUsername.length > 20) {
//       toast.error(
//         "Username cannot exceed 20 characters."
//       );
//       return;
//     }

//     if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
//       toast.error(
//         "Username can only contain letters, numbers, and underscores."
//       );
//       return;
//     }



//     if (
//       cleanPhone &&
//       !/^\+?[0-9]{10,15}$/.test(cleanPhone)
//     ) {
//       toast.error(
//         "Enter a valid phone number."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       await updateProfile({
//         firstName: cleanFirstName,
//         lastName: cleanLastName,
//         username: cleanUsername,
//         phone: cleanPhone,
//       });

    
//       await refreshUser();

//       toast.success(
//         "Profile updated successfully!"
//       );
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(
//           error.response?.data?.message ??
//             "Failed to update profile."
//         );

//         return;
//       }

//       toast.error(
//         "Failed to update profile."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="
//         rounded-3xl
//         border
//         border-slate-200
//         bg-white
//         p-6
//         shadow-lg
//         transition-colors
//         duration-300
//         dark:border-slate-800
//         dark:bg-slate-900
//       "
//     >


//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
//           Personal Information
//         </h2>

//         <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//           Manage your personal details and account
//           information.
//         </p>
//       </div>


//       <div className="grid gap-5 md:grid-cols-2">
//         <Input
//           label="First Name"
//           value={first}
//           onChange={setFirst}
//           placeholder="First Name"
//         />

//         <Input
//           label="Last Name"
//           value={last}
//           onChange={setLast}
//           placeholder="Last Name"
//         />

//         <Input
//           label="Username"
//           value={usernameValue}
//           onChange={setUsernameValue}
//           placeholder="Username"
//           icon="user"
//         />

//         <Input
//           label="Email"
//           value={email}
//           onChange={() => {}}
//           readOnly
//           icon="email"
//         />

//         <Input
//           label="Phone"
//           value={phoneValue}
//           onChange={setPhoneValue}
//           placeholder="+919876543210"
//         />
//       </div>


//       <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
//         Your email address cannot be changed from
//         your profile.
//       </p>

//       {/* Save */}

//       <div className="mt-8">
//         <Button
//           label={
//             loading
//               ? "Saving..."
//               : "Save Changes"
//           }
//           loading={loading}
//           onClick={handleSave}
//         />
//       </div>
//     </div>
//   );
// };