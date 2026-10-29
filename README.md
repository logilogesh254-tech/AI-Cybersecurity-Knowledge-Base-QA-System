# AI Cybersecurity Knowledge Base Q&A System

A beginner-friendly, responsive cybersecurity Q&A web project. It answers questions from a curated local knowledge base and politely redirects unrelated questions back to cybersecurity topics.

**Built by:** Logesh  
**Technology:** HTML, CSS, JavaScript  
**External API required:** No  
**Deployment:** GitHub Pages

## Features

- Chat-style question-and-answer interface
- Cybersecurity-only responses
- Curated answers for phishing, malware, passwords, MFA, firewalls, encryption, VPNs, ethical hacking, backups, privacy, and more
- Topic shortcut buttons
- Responsive design for mobile and desktop
- Runs entirely in the browser; no API key or server required

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a web browser.
3. Ask a cybersecurity question.

## Publish on GitHub

1. Sign in to GitHub and create a new **public repository** named `AI-Cybersecurity-Knowledge-Base-QA-System`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site. The Pages section will show the website URL.

## Example questions

- What is cybersecurity?
- What is phishing?
- How do I create a strong password?
- What is malware?
- What is a firewall?
- What is multi-factor authentication?
- What is ethical hacking?
- What is encryption?
- How do backups help protect data?

## How it works

`script.js` contains the local `knowledgeBase`. The app normalizes the user's question and checks for relevant cybersecurity keywords. If it finds a match, it displays the stored answer. Otherwise, it gives a cybersecurity-only fallback response.

This is a **rule-based knowledge-base demo**, not a generative AI model and not a substitute for professional security advice. To add more topics, add an item to `knowledgeBase` in `script.js`.

## Project structure

```text
AI-Cybersecurity-Knowledge-Base-QA-System/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Safety note

Use cybersecurity knowledge responsibly. Only test systems you own or have explicit permission to assess. Never enter real passwords, verification codes, or private information into demo applications.
