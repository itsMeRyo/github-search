import { useState, useCallback } from "react";

import { GitHubUser, GitHubRepo } from "@/types";

import { githubService } from "@/services/github";

interface UseGithubSearch {
  users: GitHubUser[];
  selectedUser: GitHubUser | null;
  isUserNotFound: boolean;
  setIsUserNotFound: (value: boolean) => void;
  repositories: GitHubRepo[];
  loading: boolean;
  error: string | null;
  activeAccordionItem: string;
  searchUsers: (query: string) => Promise<void>;
  handleUserSelect: (user: GitHubUser) => void;
  setActiveAccordionItem: (value: string) => void;
}

export const useGithubSearch = (): UseGithubSearch => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string>("");

  const searchUsers = useCallback(async (query: string) => {
    if (!query?.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const items = await githubService.searchUsers(query);
      setUsers(items);
      setIsUserNotFound(items?.length < 1);
      setSelectedUser(null);
      setRepositories([]);
      setActiveAccordionItem("");
    } catch (err: unknown) {
      console.error("Error searching users:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(`Failed to fetch users: ${errorMessage}`);
      setUsers([]);
      setSelectedUser(null);
      setRepositories([]);
      setActiveAccordionItem("");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRepositories = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const repos = await githubService.getUserRepositories(username);
      setRepositories(repos);
    } catch (err: unknown) {
      console.error("Error fetching repositories:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(`Failed to fetch repositories: ${errorMessage}`);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUserSelect = useCallback(
    (user: GitHubUser) => {
      if (selectedUser?.id === user?.id) {
        setSelectedUser(null);
        setRepositories([]);
        setActiveAccordionItem("");
      } else {
        setSelectedUser(user);
        fetchRepositories(user?.login);
        setActiveAccordionItem(`item-${user?.id}`);
      }
    },
    [selectedUser, fetchRepositories]
  );

  return {
    users,
    selectedUser,
    isUserNotFound,
    setIsUserNotFound,
    repositories,
    loading,
    error,
    activeAccordionItem,
    searchUsers,
    handleUserSelect,
    setActiveAccordionItem,
  };
};
