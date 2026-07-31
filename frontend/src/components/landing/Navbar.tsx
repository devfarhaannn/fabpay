import { useState } from "react";
import { Wallet, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={close}>
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-2 shadow-lg sm:p-3">
            <Wallet className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              FabPay
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Digital Wallet
            </p>
          </div>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Features
          </a>
          <a
            href="#how"
            className="font-medium text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="font-medium text-slate-600 transition hover:text-indigo-600"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/signin"
            className="font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="
              rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600
              px-6 py-3 font-semibold text-white shadow-lg
              transition-all duration-300
              hover:scale-105 hover:shadow-indigo-400/40
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            flex rounded-xl border border-slate-200 p-2
            text-slate-700 transition hover:bg-slate-100
            md:hidden
          "
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="#features"
              onClick={close}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Features
            </a>
            <a
              href="#how"
              onClick={close}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={close}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </a>
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <Link
              to="/signin"
              onClick={close}
              className="
                rounded-xl border border-slate-200 px-4 py-3
                text-center font-medium text-slate-700
                transition hover:bg-slate-50
              "
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={close}
              className="
                rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600
                px-4 py-3 text-center font-semibold text-white shadow-lg
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};