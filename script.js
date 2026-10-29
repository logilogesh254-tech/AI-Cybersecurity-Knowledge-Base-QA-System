// AI Cybersecurity Knowledge Base Q&A System
// This demo uses a local, curated knowledge base. It does not call an external AI API.

const knowledgeBase = [
  { keys: ["cybersecurity", "cyber security", "information security"], answer: "Cybersecurity is the practice of protecting computers, networks, applications, and data from unauthorized access, attacks, damage, or theft.\n\nKey goals:\n• Confidentiality — only authorized people can access information.\n• Integrity — information remains accurate and unaltered.\n• Availability — systems and data are accessible when needed." },
  { keys: ["phishing", "fake email", "suspicious email"], answer: "Phishing is a social-engineering attack in which someone pretends to be a trusted person or organization to trick people into revealing information or opening harmful links.\n\nStay safer:\n• Check the sender and website address carefully.\n• Avoid unexpected links and attachments.\n• Never share passwords or one-time verification codes.\n• Report suspicious messages through the official channel." },
  { keys: ["strong password", "password safety", "password", "passphrase"], answer: "Use a long, unique passphrase for every account. A password manager can help create and store unique passwords. Turn on multi-factor authentication (MFA), and never share passwords or verification codes. If you think an account is compromised, change its password using the official website or app." },
  { keys: ["malware", "virus", "ransomware", "trojan", "spyware"], answer: "Malware is software designed to harm a device, disrupt operations, steal information, or gain unauthorized access.\n\nCommon types include viruses, worms, trojans, spyware, and ransomware. Reduce risk by updating software, using reputable security tools, downloading from trusted sources, and keeping backups. Do not open unexpected attachments." },
  { keys: ["firewall"], answer: "A firewall monitors and filters incoming and outgoing network traffic according to security rules. It helps block unauthorized connections while allowing permitted communication. Firewalls can be software-based, hardware-based, or built into cloud services; they work best alongside updates, strong authentication, and other security controls." },
  { keys: ["multi-factor", "multifactor", "mfa", "two-factor", "2fa"], answer: "Multi-factor authentication (MFA) requires two or more different types of proof to verify a login, such as something you know (a password), something you have (a security key), or something you are (a biometric). MFA adds protection if a password is stolen. Prefer passkeys or security keys when available." },
  { keys: ["ethical hacking", "penetration testing", "pen testing"], answer: "Ethical hacking is authorized security testing performed to find and report weaknesses so they can be fixed. It must have clear permission, a defined scope, and responsible reporting. Only test systems you own or have explicit written authorization to assess." },
  { keys: ["encryption", "encrypt", "decryption"], answer: "Encryption transforms readable data (plaintext) into unreadable ciphertext using a cryptographic method and key. Decryption turns it back into readable form for an authorized party. Encryption helps protect information in transit and at rest, but key management and secure endpoints are also important." },
  { keys: ["vpn", "virtual private network"], answer: "A VPN creates an encrypted connection between your device and a VPN server. It can help protect traffic on untrusted networks and change the network address websites see, but it does not make you completely anonymous or protect you from phishing, malware, or every form of tracking." },
  { keys: ["social engineering"], answer: "Social engineering manipulates people into sharing information or taking unsafe actions. Examples include phishing, impersonation, and fake urgent requests. Verify requests using a separate trusted contact method, be cautious of pressure, and never disclose passwords or verification codes." },
  { keys: ["ddos", "denial of service"], answer: "A denial-of-service (DoS) attack attempts to make a service unavailable by overwhelming or disrupting it. A distributed denial-of-service (DDoS) attack uses many systems or sources. Defenses may include traffic filtering, rate limiting, resilient infrastructure, and a response plan with the hosting provider." },
  { keys: ["patch", "software update", "updates"], answer: "Security updates fix known vulnerabilities and other software problems. Enable automatic updates where appropriate, update operating systems, browsers, apps, and router firmware, and obtain updates only from official sources. For organizations, test and prioritize patches based on risk." },
  { keys: ["backup", "backups", "3-2-1"], answer: "Backups help recover data after accidental deletion, device failure, or ransomware. Keep multiple copies on different types of storage, with at least one copy offline or otherwise isolated. Test restores regularly, and protect backup access with strong authentication." },
  { keys: ["wifi", "wi-fi", "public wi-fi", "wireless network"], answer: "For safer Wi-Fi, use WPA2-AES or WPA3, set a unique router administrator password, update router firmware, and disable features you do not need. On public Wi-Fi, use HTTPS websites, avoid sensitive activity on untrusted devices, and consider a reputable VPN when appropriate." },
  { keys: ["personal data", "privacy", "data protection"], answer: "Protect personal data by sharing only what is necessary, reviewing app permissions, using privacy settings, and checking website addresses before entering information. Be careful with public posts and unknown quizzes or forms. Never send sensitive information to an unverified person or service." },
  { keys: ["incident response", "data breach", "hacked account", "account hacked"], answer: "If you suspect an account is compromised, use the official service to change the password from a trusted device, sign out other sessions, enable MFA, and check recovery details. Tell the relevant IT/security team or service provider. Preserve useful evidence and follow your organization's incident-response process." },
  { keys: ["zero day", "zero-day"], answer: "A zero-day vulnerability is a software flaw that the vendor may not yet know about or may not have had time to fix. Defenses include prompt security updates when available, reducing unnecessary exposure, least-privilege access, monitoring, and layered security controls." },
  { keys: ["least privilege", "principle of least privilege"], answer: "The principle of least privilege means giving each user, app, or process only the permissions needed for its task, for only as long as needed. It limits the damage that can result from mistakes or compromised accounts." },
  { keys: ["http", "https", "ssl", "tls"], answer: "HTTPS uses TLS to encrypt communication between a browser and a website and helps authenticate the website. Look for the correct domain and HTTPS, but remember that a scam website can also use HTTPS. HTTPS alone does not prove a site is trustworthy." },
  { keys: ["iot", "internet of things", "smart device"], answer: "IoT security protects connected devices such as cameras, sensors, and smart appliances. Change default passwords, install firmware updates, disable unused features, place devices on a separate guest network when possible, and buy devices from vendors that provide security support." },
  { keys: ["cia triad", "confidentiality integrity availability"], answer: "The CIA triad is a basic information-security model:\n• Confidentiality: prevent unauthorized disclosure.\n• Integrity: prevent unauthorized alteration and preserve accuracy.\n• Availability: ensure authorized users can access systems and data when required." },
  { keys: ["sql injection", "injection"], answer: "SQL injection is a vulnerability where untrusted input changes the meaning of a database query. Developers can prevent it by using parameterized queries or prepared statements, validating input appropriately, limiting database permissions, and avoiding unsafe query construction." },
  { keys: ["xss", "cross-site scripting"], answer: "Cross-site scripting (XSS) occurs when an application includes untrusted content in a webpage in a way that lets script run in another user's browser. Defenses include context-aware output encoding, safe templating, careful input handling, and Content Security Policy as an additional layer." },
  { keys: ["network security", "network"], answer: "Network security protects connected devices and data using controls such as firewalls, secure configurations, segmentation, encryption, access control, monitoring, and timely updates. Use layered defenses rather than relying on a single tool." }
];

const form = document.getElementById("chatForm");
const input = document.getElementById("questionInput");
const messages = document.getElementById("chatMessages");

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function getAnswer(question) {
  const q = normalize(question);
  const cyberTerms = ["cyber", "security", "hack", "phish", "password", "malware", "virus", "network", "firewall", "encrypt", "privacy", "data", "wifi", "wi-fi", "vpn", "mfa", "2fa", "ransomware", "breach", "vulnerability", "https", "http", "backup", "ethical", "ddos", "sql", "xss", "patch", "iot", "confidentiality", "integrity", "availability", "social engineering", "zero day", "least privilege", "incident response"];
  const match = knowledgeBase.find(item => item.keys.some(key => q.includes(normalize(key))));
  if (match) return match.answer;
  if (cyberTerms.some(term => q.includes(term))) {
    return "That sounds cybersecurity-related, but I don't have a specific answer for it in this demo knowledge base yet. Try asking about phishing, malware, firewalls, encryption, MFA, ethical hacking, backups, or network security.";
  }
  return "I can answer cybersecurity knowledge-base questions only. Please ask about a topic such as phishing, malware, passwords, firewalls, encryption, network security, privacy, or ethical hacking.";
}

function addMessage(text, type) {
  const row = document.createElement("div");
  row.className = `message ${type}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function askQuestion(question) {
  const cleaned = question.trim();
  if (!cleaned) return;
  const welcome = messages.querySelector(".welcome-card");
  if (welcome) welcome.remove();
  addMessage(cleaned, "user");
  addMessage(getAnswer(cleaned), "bot");
  input.value = "";
  input.focus();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  askQuestion(input.value);
});

document.querySelectorAll("[data-question]").forEach(button => {
  button.addEventListener("click", () => askQuestion(button.dataset.question));
});

document.getElementById("clearChat").addEventListener("click", () => {
  messages.innerHTML = "";
  const card = document.createElement("div");
  card.className = "welcome-card";
  card.innerHTML = '<div class="welcome-icon">✦</div><p class="welcome-label">WELCOME</p><h2>Welcome to AI Cyber Security Knowledge Based Questions and Answers System</h2><p>Ask a cybersecurity question to explore the local knowledge base.</p>';
  messages.appendChild(card);
});
