# SpectraQ Frontend (Vite + TypeScript)

This project is the **frontend** for the **SpectraQ** platform, built using **Vite + TypeScript**.  
It can be containerized and deployed easily using **Docker**.

---

## 🚀 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) ≥ 20.10
- (Optional) [Docker Compose](https://docs.docker.com/compose/) if you plan to run multiple services together.

---

## 🏗️ Build the Docker Image

From the project root (`SpectraQ_client`), run:

```bash
docker build -t spectraq-frontend .
```

## ▶️ Run the Container

From the project root (`SpectraQ_client`), run:

```bash
docker run -d -p 3000:80 spectraq-frontend
```

## Stop & Remove Containers

```bash
docker ps
docker stop <container_id>
docker rm <container_id>
docker rmi spectraq-frontend
```

## Development Notes

```bash
npm install
npm run dev
```
