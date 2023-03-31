.PHONY: build-backend build-frontend run build-run-all

build-backend:
	docker build -t backend-image ./backend

build-frontend:
	docker build -t frontend-image ./frontend

run: 
	docker-compose up

remove-backend:
	docker rmi backend-image

remove-frontend:
	docker rmi frontend-image

remove-images:
	$(MAKE) remove-backend
	$(MAKE) remove-frontend

build-run-all: 
	$(MAKE) build-backend 
	$(MAKE) build-frontend 
	$(MAKE) run