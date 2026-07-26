import { Search, Users } from "lucide-react";
import { useEffect, useState } from "react";

import type { User } from "../../types/user";

import { searchUsers } from "../../services/user.service";

import { Avatar } from "../ui/Avatar";
import { EmptyState } from "../common/EmptyState";

interface SearchUserProps {
  onSelect: (user: User) => void;
}

export const SearchUser = ({
  onSelect,
}: SearchUserProps) => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchUsers(search);

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

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
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Search User
      </h2>

      <div
        className="
          flex
          items-center

          rounded-xl

          border
          border-slate-300

          bg-white

          px-4
          py-3

          transition-all
          duration-300

          focus-within:border-indigo-500

          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <Search
          size={20}
          className="text-slate-400 dark:text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="
            ml-3
            w-full

            bg-transparent

            text-slate-900
            placeholder:text-slate-400

            outline-none

            dark:text-slate-100
            dark:placeholder:text-slate-500
          "
        />

      </div>

      <div className="mt-6 space-y-3">

        {loading ? (

          <p className="text-center text-slate-500 dark:text-slate-400">
            Searching...
          </p>

        ) : users.length > 0 ? (

          users.map((user) => (

            <button
              key={user.id}
              onClick={() => onSelect(user)}
              className="
                flex
                w-full
                items-center
                justify-between

                rounded-2xl

                border
                border-slate-200

                bg-white

                p-4

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-indigo-500
                hover:bg-slate-50
                hover:shadow-md

                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-indigo-500
                dark:hover:bg-slate-700
              "
            >

              <div className="flex items-center gap-4">

                <Avatar
                  name={`${user.firstName} ${user.lastName}`}
                  size={50}
                />

                <div className="text-left">

                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {user.firstName} {user.lastName}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>

                </div>

              </div>

              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Select →
              </span>

            </button>

          ))

        ) : (

          <EmptyState
            icon={
              <Users
                className="text-indigo-600 dark:text-indigo-400"
                size={36}
              />
            }
            title="No Users Found"
            description="Try searching with a different name or email."
          />

        )}

      </div>

    </div>
  );
};