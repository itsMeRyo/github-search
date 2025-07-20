# GitHub User & Repository Search App

This app helps you quickly find GitHub users and explore their public projects.

## Live Demo

Check out the app in action: <https://ryo-github-search.vercel.app/>

## What it Does

- **Find Users:** Search for GitHub usernames.

- **Smart Search:** It waits a moment after you type to avoid too many API calls.

- **See Results:** Shows a list of users with their profile pictures.

- **View Repos:** Click on a user to see their public repositories, including details like stars and forks.

- **Clear Feedback:** You'll see "Loading..." messages and clear error alerts if something goes wrong.

- **Works Everywhere:** Looks good on phones, tablets, and desktops.

## Get Started Locally

Want to run it on your computer?

### You'll Need

- pnpm (If you don't have it: `npm install -g pnpm`)

### Setup

1.  **Grab the code:**

    ```bash
    git clone https://github.com/itsMeRyo/github-search github-search
    cd github-search
    ```

2.  **Install everything:**

    ```bash
    pnpm install
    ```

### Run the App

```bash
pnpm start
```

Open your browser to `http://localhost:3000`.

## Testing

I use Cypress to make sure things are working.

### How to Run Tests

1.  **Install Cypress:**

    ```bash
    pnpm add cypress --save-dev
    ```

2.  **Start Cypress:**

    ```bash
    npx cypress open
    ```

3.  Choose **"E2E Testing"** in the Cypress window.

4.  Select a browser (e.g., Chrome, Electron) to run your tests in.

5.  Pick a test file (e.g., `positive.cy.tsx` or `negative.cy.tsx`) to run it.

### About the Tests

- **`cypress/fixtures/positive.json`**: Provides mocked API responses for successful (positive) test scenarios.

- **`cypress/fixtures/negative.json`**: Provides mocked API responses for unsuccessful (negative) test scenarios.

- **`cypress/e2e/positive.cy.`**: Contains E2E tests for successful user search and repository display.

- **`cypress/e2e/negative.cy.`**: Contains E2E tests for error handling and no-results scenarios.
