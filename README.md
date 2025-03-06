# 🕵️ Foreman: Your AI-Powered Medical Research Assistant

**Uncover evidence-based insights, clinical studies, and case reports instantly, cutting through the noise.**

## 🔍 The Problem Foreman Solves

Navigating the vast sea of medical information is daunting. Researchers and clinicians spend countless hours sifting through papers, trials, and reports. Foreman streamlines this process, providing rapid, AI-driven access to vital medical knowledge.

## ✨ Key Features

* **Intelligent Search:** Effortlessly find answers, studies, and cases related to symptoms and conditions.
* **Data Aggregation:** Pulls structured data from reputable sources like Google Scholar and (future) PubMed.
* **AI Summarization:** Get concise, accurate insights generated by AI.
* **Secure Authentication:** Log in with GitHub or Google for a seamless experience.

## 🛠️ Tech Stack (Built Solo!)

* **Frontend:** Next.js 15 (App Router), Tailwind CSS, TypeScript - Clean, modern, and responsive.
* **Backend:** NextAuth.js (GitHub & Google OAuth) - Secure and simple authentication.
* **Data:** Primarily API-driven (Google Scholar, future PubMed).
* **AI:** OpenAI for intelligent summarization.

## 🚀 Getting Started (Local Setup)

1.  **Clone the Repository:**

    ```bash
    git clone [[your-repo-link]](https://github.com/yourusername/foreman.git)
    cd foreman
    ```

2.  **Install Dependencies:**

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment Variables:**

    Create a `.env.local` file with the following:

    ```ini
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    NEXTAUTH_SECRET=your_random_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

    *(Remember to replace the placeholders with your actual credentials.)*

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Foreman will be available at `http://localhost:3000`.

## 🔒 Authentication (Using NextAuth.js)

* Click "Sign in with Google" or "Sign in with GitHub."
* If you encounter issues, verify your redirect URIs in your Google Cloud Console and GitHub Developer Settings.

## 🚧 Future Plans

* **PubMed Integration:** Access a wider range of medical literature.
* **Enhanced AI Insights:** Leverage more advanced AI models for deeper analysis.
* **Research History:** Save and manage your research sessions.

## 🤝 Contributions (Open Source!)

Feel free to fork the repository and contribute!

1.  Create a new branch: `git checkout -b feature-name`
2.  Commit your changes: `git commit -m "Added feature"`
3.  Push and open a pull request.

## 📧 Contact

For questions or suggestions, please reach out via email: prabhmeetsinghns1000@gmail.com
