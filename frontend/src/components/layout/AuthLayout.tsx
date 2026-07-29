import type { ReactNode } from "react";
import { AuthBanner } from "../auth/AuthBanner";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({
  children,
}: AuthLayoutProps) => {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        dark:bg-slate-950

        lg:grid
        lg:grid-cols-2
      "
    >
      

      <div
        className="
          hidden
          lg:flex
          lg:min-h-screen
        "
      >
        <AuthBanner />
      </div>

      

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center

          px-4
          py-5

          sm:px-6
          sm:py-6

          md:px-8

          lg:px-8
          lg:py-5

          xl:px-12
        "
      >
        <div
          className="
            w-full

            max-w-md

            md:max-w-xl

            lg:max-w-xl

            xl:max-w-2xl
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};