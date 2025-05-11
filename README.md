
# Xeno Assignment Backend

## 📋 Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MySQL Server (local or cloud-hosted)

### Steps
1. Clone the repository
   git clone https://github.com/girishgubba/xeno_backend.git
   cd xeno_backend
   

2. Install dependencies
   
   npm install
   

3. Set up environment variables
   - Create a `.env` file in the root directory:
     cp .env.example .env
     
   - Fill in the values:
     env
     PORT=3001
     DATABASE_URL=mysql://username:password@host:port/database_name
     GOOGLE_OAUTH_CLIENT_ID=your_client_id
     GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
     JWT_SECRET=your_jwt_secret_key
     OPENAI_API_KEY=your_openai_key
     GEMINI_API_KEY=your_gemini_key
     

4. Database setup
   - Create the MySQL database (if not auto-provisioned):
     CREATE DATABASE xeno_backend;
     
  

5. Start the server
   
   npm run dev # Development mode (with nodemon)
  

---

## 🗺️ Architecture Diagram


                      +-------------------+
                      |     Frontend      |
                      | (Next.js/React)   |
                      +---------+---------+
                                |
                                | HTTP Requests
                                |
+----------------+     +--------+--------+     +-------------------+
|   AI Services  |     |   Backend API   |     |   MySQL Database  |
| (OpenAI, Gemini|<--->| (Node.js/Express)|<--->|   |
+----------------+     +-----------------+     +-------------------+
                                |
                                | Auth
                                |
                      +---------+---------+
                      |   Google OAuth    |
                      +-------------------+


Key Flow:
1. Frontend sends HTTP requests to backend API endpoints.
2. Backend handles authentication (Google OAuth/JWT), processes requests, and interacts with MySQL.
3. For AI features, the backend calls OpenAI/Gemini APIs and returns results to the frontend.

---
## 🛠️ Tech Stack & AI Tools

### Backend
- Framework: Node.js
- Database: MySQL (Hosted on Railway)
- Authentication: Google OAuth 2.0, JWT
- API Documentation: Postman 




---

## ⚠️ Known Limitations & Assumptions

### Limitations
1. Rate Limiting: No rate-limiting on API endpoints.
2. Error Handling: Basic error responses; no retry logic for AI API failures.
3. Scalability: Monolithic architecture; not optimized for horizontal scaling.
4. Security: Relies on environment variables for secrets (no Vault integration).

### Assumptions
1. Database: MySQL is pre-configured and accessible.
2. Third-Party Services: Google OAuth, OpenAI, and Gemini APIs are enabled and have valid credentials.
3. Network: Backend is exposed on `localhost:3000` during local development.
4. Environment: `.env` file is properly configured and never committed to Git.

---

## 🔗 Links
- [Frontend Repository](https://github.com/girishgubba/xeno_frontend)


---

