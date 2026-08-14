.PHONY: dev-frontend dev-backend dev-docker install-frontend install-backend migrate seed seed-events import-github import-github-docker clean-demo-urls clean-demo-urls-apply test test-backend test-frontend lint lint-backend lint-frontend build-frontend

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

seed-events:
	cd backend && python seed_events.py

import-github:
	cd backend && python import_github.py

clean-demo-urls:
	cd backend && python clean_demo_urls.py

clean-demo-urls-apply:
	cd backend && python clean_demo_urls.py --apply

import-github-docker:
	docker exec porfolio_kr-backend-1 python import_github.py

test-backend:
	cd backend && python -m pytest -v

test-frontend:
	cd frontend && npx tsc --noEmit

test: test-backend test-frontend

lint-backend:
	cd backend && python -m ruff check .

lint-frontend:
	cd frontend && npx eslint

lint: lint-backend lint-frontend

build-frontend:
	cd frontend && npm run build
