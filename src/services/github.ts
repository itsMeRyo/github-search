import { GitHubUser, GitHubRepo } from "@/types";

const GITHUB_API_BASE = "https://api.github.com";

export const githubService = {
  async searchUsers(query: string): Promise<GitHubUser[]> {
    if (!query.trim()) return [];

    const response = await fetch(
      `${GITHUB_API_BASE}/search/users?q=${query}&per_page=5`
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items;
  },

  async getUserRepositories(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    return response.json();
  },
};
