+🚀 Foreman – AI-Powered Medical Research Assistant*
🔬 Instantly find evidence-based answers, clinical studies, and case reports without the noise.



📌 Features
✅ AI-powered medical research assistant
✅ Search and analyze symptoms, case studies, and clinical trials
✅ Fetches structured data from Google Scholar, PubMed, and medical sources
✅ Fast & accurate AI-generated insights
✅ Secure GitHub & Google authentication

💻 Tech Stack
Frontend: Next.js 15 (App Router), Tailwind CSS, TypeScript
Backend: NextAuth.js (GitHub & Google OAuth)
Database: Not needed (yet), but possible future integration
APIs Used: Google Scholar API, OpenAI (for summarization)
📦 Installation & Setup
1️⃣ Clone the Repo
sh
Copy
Edit
git clone https://github.com/yourusername/foreman.git
cd foreman
2️⃣ Install Dependencies
sh
Copy
Edit
npm install --legacy-peer-deps
3️⃣ Setup Environment Variables
Create a .env.local file and add:

ini
Copy
Edit
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
4️⃣ Run the App
sh
Copy
Edit
npm run dev
Foreman will be live at: http://localhost:3000

🔐 Authentication
Foreman supports Google & GitHub OAuth via NextAuth.js.

To test authentication:

Click Sign in with Google or GitHub
If login fails, check the redirect URIs in Google Cloud Console & GitHub Developer Settings
🛠 Future Improvements
✅ Integrate PubMed API for deep medical research
✅ Enhance AI-generated medical insights with OpenAI’s GPT
✅ Save research history for doctors & researchers

🤝 Contributing
Want to improve Foreman? Contributions are welcome!

Fork the repo
Create a new branch: git checkout -b feature-name
Commit changes: git commit -m "Added new feature"
Push & open a Pull Request
