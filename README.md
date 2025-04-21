# Backend - Node.js + Express + MySQL + Redis + Socket.io

## ✅ Requisitos

- Node.js v16 o superior
- MySQL
- Redis (ver instrucciones para Windows más abajo)

---

## 🔧 Instalación

1. Clonar el proyecto y entrar al directorio del backend:

```bash
-git clone [URL-del-repo]
cd backend
////
wsl --install
sudo apt update
sudo apt install redis

redis-server

docker run --name redis -p 6379:6379 -d redis
