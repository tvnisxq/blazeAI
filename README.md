# AI Portfolio Architect

An intelligent, end-to-end microservice application that transforms raw professional data into structured, visually compelling portfolios using Large Language Models and Named Entity Recognition (NER). 

Instead of traditional web scraping, this system ingests clean profile data via API, processes the raw text to extract core competencies, generates persona-driven biographies, and serves the optimized data to a modern web client.

## 🧠 Core Architecture & ML Pipeline

This project is built with a decoupled architecture, separating the heavy AI inference engine from the client-facing application.

* **Data Ingestion:** Integrates with third-party APIs (Proxycurl) to securely ingest structured professional data, bypassing fragile scraping methods.
* **NLP & Skill Extraction:** Utilizes `spaCy` / Hugging Face models to parse unstructured job descriptions and isolate hard/soft skills.
* **Generative Bio Engine:** Leverages LangChain and LLMs to dynamically rewrite professional summaries tailored to specific industry personas (e.g., Startup, Enterprise, Creative).
* **Backend:** High-performance asynchronous API built with `FastAPI` and validated via `Pydantic`.
* **Database:** `PostgreSQL` for persistent storage of user entities and generated portfolios.
* **Frontend:** `Next.js` and `Tailwind CSS` for a responsive, component-driven user interface.

## ⚙️ Tech Stack

**Backend / AI:** Python, FastAPI, LangChain, spaCy, SQLAlchemy, PostgreSQL  
**Frontend:** React, Next.js, Tailwind CSS  
**DevOps:** Docker, Docker Compose, GitHub Actions  

## 🚀 Quick Start (Docker)

The easiest way to run the entire stack locally is via Docker Compose.

1. Clone the repository:
   ```bash
   git clone [https://github.com/tvnisxq/ai-portfolio-architect.git](https://github.com/tvnisxq/ai-portfolio-architect.git)
   cd ai-portfolio-architect