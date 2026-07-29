import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";

import { AuthLayout } from "../components/layout/AuthLayout";
import { AuthHeader } from "../components/auth/AuthHeader";
import { AuthForm } from "../components/auth/AuthForm";

import { Input } from "../components/ui/Input";
import { PasswordInput } from "../components/ui/PasswordInput";
import { Button } from "../components/ui/Button";

import { signup } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

import { signupSchema } from "../schemas/signup.schema";

export const SignUp = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {

      const validatedData = signupSchema.parse({
        firstName: firstname,
        lastName: lastname,
        username,
        email,
        password,
        confirmPassword,
      });

      setLoading(true);


      await signup({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,

        username:
          validatedData.username.toLowerCase(),

        email:
          validatedData.email.toLowerCase(),

        password: validatedData.password,
      });

 
      await refreshUser();

      toast.success(
        "Account created successfully!"
      );

      navigate("/dashboard");
    } catch (error) {


      if (error instanceof ZodError) {
        const firstError =
          error.issues[0]?.message;

        toast.error(
          firstError ??
            "Please check your information."
        );

        return;
      }

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Signup failed."
        );

        return;
      }

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Create Account 💳"
        subtitle="Join FabPay and start sending money securely."
        linkText="Already have an account?"
        linkTo="/signin"
      />

      <AuthForm onSubmit={handleSignup}>

        

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={firstname}
            onChange={setFirstname}
            icon="user"
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={lastname}
            onChange={setLastname}
            icon="user"
          />
        </div>

        

        <Input
          label="Username"
          placeholder="Choose a username"
          value={username}
          onChange={setUsername}
          icon="user"
        />

        

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          icon="email"
        />

  

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

      

        <Button
          type="submit"
          loading={loading}
          label={
            loading
              ? "Creating Account..."
              : "Create Account"
          }
        />

      </AuthForm>
    </AuthLayout>
  );
};