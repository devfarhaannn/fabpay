import {
  Search,
  Users,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type { User } from "../../types/user";

import {
  searchUsers,
  getSuggestedUsers,
} from "../../services/user.service";

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

  const [suggestedUsers, setSuggestedUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [suggestedLoading, setSuggestedLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setSuggestedLoading(true);
        setError(false);

        const data =
          await getSuggestedUsers();

        setSuggestedUsers(data);
      } catch (error) {
        console.error(
          "Failed to load suggested users:",
          error
        );

        setError(true);
      } finally {
        setSuggestedLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  useEffect(() => {
    const cleanSearch = search.trim();

    if (!cleanSearch) {
      setUsers([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(false);

        const data =
          await searchUsers(cleanSearch);

        setUsers(data);
      } catch (error) {
        console.error(
          "Failed to search users:",
          error
        );

        setUsers([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const isSearching =
    search.trim().length > 0;

  const displayedUsers = isSearching
    ? users
    : suggestedUsers;

  const isLoading = isSearching
    ? loading
    : suggestedLoading;

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
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Find Recipient
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search for a FabPay user or choose a
          suggested recipient.
        </p>
      </div>

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
          focus-within:ring-4
          focus-within:ring-indigo-100

          dark:border-slate-700
          dark:bg-slate-800
          dark:focus-within:border-indigo-500
          dark:focus-within:ring-indigo-900/30
        "
      >
        <Search
          size={20}
          className="
            shrink-0
            text-slate-400
            dark:text-slate-500
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name, username or email..."
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

      {!isSearching && (
        <div className="mt-6 flex items-center gap-2">
          <Sparkles
            size={18}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Suggested Recipients
            </h3>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Demo accounts you can use to test
              transfers.
            </p>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="mt-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Search Results
          </h3>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  flex
                  animate-pulse
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  p-4

                  dark:border-slate-700
                "
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />

                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />

                  <div className="mt-2 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-5
              text-center

              dark:border-red-900/40
              dark:bg-red-950/20
            "
          >
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Unable to load users.
            </p>

            <p className="mt-1 text-xs text-red-500/80 dark:text-red-400/70">
              Please try again.
            </p>
          </div>
        ) : displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() =>
                onSelect(user)
              }
              className="
                flex
                w-full
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-left
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-indigo-400
                hover:bg-slate-50
                hover:shadow-md

                active:scale-[0.99]

                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-indigo-500
                dark:hover:bg-slate-700
              "
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="shrink-0">
                  <Avatar
                    name={`${user.firstName} ${user.lastName}`}
                    size={50}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                    {user.firstName}{" "}
                    {user.lastName}
                  </h3>

                  <p className="mt-0.5 truncate text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    @{user.username}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <span
                className="
                  shrink-0
                  rounded-lg
                  bg-indigo-50
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-indigo-600
                  transition

                  group-hover:bg-indigo-100

                  dark:bg-indigo-950/40
                  dark:text-indigo-400
                "
              >
                Select →
              </span>
            </button>
          ))
        ) : isSearching ? (
          <EmptyState
            icon={
              <Users
                className="text-indigo-600 dark:text-indigo-400"
                size={36}
              />
            }
            title="No Users Found"
            description="Try searching with a different name, username or email."
          />
        ) : (
          <EmptyState
            icon={
              <Users
                className="text-indigo-600 dark:text-indigo-400"
                size={36}
              />
            }
            title="No Suggested Recipients"
            description="No demo recipients are available right now."
          />
        )}
      </div>
    </div>
  );
};