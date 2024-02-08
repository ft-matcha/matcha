all : build

build :
	docker compose up -d --build

up :
	docker compose up

down :
	docker compose down

push :
	docker compose push

fargate :
	docker compose -f docker-compose-fargate.yml build
	docker compose -f docker-compose-fargate.yml push
	
db :
	rm -rf db/*

fclean :
	docker compose down --rmi all
	docker system prune --volumes --force --all

re :
	make fclean
	make

ps :
	docker compose ps

clear :
	rm -rf ./db/*

.PHONY : db