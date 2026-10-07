# MailMate AI ✨

An AI-powered Gmail reply assistant that generates context-aware
email responses directly inside Gmail using Spring Boot, Gemini API,
and a Chrome Extension.

## 🚀 Features

- AI-powered email reply generation
- Gmail integration through Chrome Extension
- Multiple response tones
  - Professional
  - Friendly
  - Formal
  - Casual
  - Concise
- Spring Boot REST API
- Gemini API integration
- Real-time reply generation
- Automatic insertion of generated replies into Gmail

## 🏗️ Architecture

[architecture diagram]

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- REST API
- Maven

### AI
- Google Gemini API

### Frontend / Extension
- JavaScript
- Chrome Extension APIs
- Gmail DOM integration

### Other
- Git
- GitHub
- Postman

## 📂 Project Structure

...

## ⚙️ Setup

### 1. Clone the repository

git clone ...

### 2. Configure Gemini API

Set the following environment variables:

GEMINI_URL=...
GEMINI_KEY=...

### 3. Run Spring Boot

./mvnw spring-boot:run

### 4. Load Chrome Extension

1. Open chrome://extensions
2. Enable Developer Mode
3. Click Load unpacked
4. Select `email-writer-ext`

### 5. Open Gmail

Open an email → Reply → Select tone → Generate reply.

## 🔒 Security

API credentials are stored using environment variables
and are not included in the repository.

## 📸 Demo

[GIF / screenshots]

## 🔮 Future Improvements

- Conversation-aware reply generation
- Streaming responses
- User-defined tones
- Response history
- Production deployment
