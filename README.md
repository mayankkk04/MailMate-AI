# MailMate AI ✨

> An AI-powered Gmail reply assistant that generates context-aware, tone-adaptive email responses directly inside Gmail — powered by Spring Boot, the Gemini API, and a lightweight Chrome Extension.

![Java](https://img.shields.io/badge/Java-17+-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?logo=springboot)
![Gemini API](https://img.shields.io/badge/Google-Gemini%20API-blue?logo=google)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow?logo=googlechrome)

---

## 📖 Overview

MailMate AI eliminates the friction of writing repetitive email replies. It injects an AI-powered "Reply with MailMate" option directly into the Gmail compose window via a Chrome Extension, calls a Spring Boot backend that talks to Google's Gemini API, and inserts a tone-matched draft straight into the reply box — no copy-pasting, no context switching.

## 🚀 Features

- **AI-powered reply generation** — context-aware drafts generated from the original email thread
- **Native Gmail integration** — works directly inside the Gmail compose UI via a Chrome Extension
- **Multiple response tones** — Professional · Friendly · Formal · Casual · Concise
- **Real-time generation** — replies are generated and inserted in a single click, no page reload
- **RESTful Spring Boot backend** — clean separation between extension (client) and AI logic (server)
- **Secure credential handling** — API keys managed via environment variables, never committed to source

## 🏗️ Architecture

```
┌──────────────────┐      HTTP (REST)      ┌───────────────────┐      API call      ┌────────────────┐
│  Chrome Extension│ ───────────────────▶ │  Spring Boot API  │ ─────────────────▶ │  Gemini API    │
│  (Gmail DOM +    │ ◀─────────────────── │ (reply generation │ ◀───────────────── │  (Google AI)   │
│   content script)│     generated reply   │   service layer)  │    AI response     │                │
└──────────────────┘                       └───────────────────┘                    └────────────────┘
```

1. The extension injects a **"Generate Reply"** button into Gmail's reply toolbar.
2. On click, it extracts the email thread content and the user's selected tone.
3. This payload is sent to the Spring Boot REST API.
4. The backend constructs a prompt and calls the **Gemini API**.
5. The generated reply is returned and auto-inserted into the Gmail compose box.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java, Spring Boot, REST API, Maven |
| **AI** | Google Gemini API |
| **Extension / Frontend** | JavaScript, Chrome Extension APIs (Manifest V3), Gmail DOM integration |
| **Tooling** | Git, GitHub, Postman |

## 📂 Project Structure

```
mailmate-ai/
├── src/main/java/com/mailmate/
│   ├── controller/        # REST endpoints
│   ├── service/            # Gemini API integration + prompt logic
│   ├── dto/                 # Request/response models
│   └── config/              # App & security configuration
├── src/main/resources/
│   └── application.properties
├── email-writer-ext/       # Chrome Extension
│   ├── manifest.json
│   ├── content.js          # Gmail DOM integration
│   └── popup/
├── pom.xml
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites
- Java 17+
- Maven
- A Google Gemini API key
- Google Chrome

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/mailmate-ai.git
cd mailmate-ai
```

### 2. Configure the Gemini API
Create a `.env` file or set the following environment variables:
```bash
GEMINI_URL=<your-gemini-endpoint>
GEMINI_KEY=<your-api-key>
```

### 3. Run the Spring Boot backend
```bash
./mvnw spring-boot:run
```
The API will start on `http://localhost:8080` by default.

### 4. Load the Chrome Extension
1. Open `chrome://extensions`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `email-writer-ext` folder

### 5. Use it in Gmail
Open any email → click **Reply** → select a tone → click **Generate Reply**. The AI-drafted response is inserted directly into the compose box, ready to edit or send.

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/email/generate` | Generates a reply for a given email thread and tone |

**Sample request:**
```json
{
  "emailContent": "Hi, can we reschedule our meeting to Friday?",
  "tone": "professional"
}
```

**Sample response:**
```json
{
  "reply": "Hi, thanks for letting me know — Friday works well for me. Let me know your preferred time and I'll confirm."
}
```

## 🔒 Security

- API credentials (Gemini keys, endpoints) are injected via environment variables and are **never** committed to the repository.
- No email content is persisted or logged server-side — requests are processed in-memory and discarded after the response is returned.

## 🔮 Roadmap

- [ ] Conversation-aware reply generation (full thread context, not just the latest message)
- [ ] Streaming responses for lower perceived latency
- [ ] User-defined custom tones
- [ ] Reply history and regeneration

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](../../issues) or open a pull request.
