.PHONY: dev-frontend dev-backend dev-docker install-frontend install-backend migrate seed import-github

dev-frontend:
	cd frontend && npm run dev -- --webpack --port 3003

dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

dev-docker:
	docker compose up -d

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && pip install -r requirements.txt

migrate:
	cd backend && alembic upgrade head

seed:
	cd backend && python seed.py

import-github:
	cd backend && python import_github.py

