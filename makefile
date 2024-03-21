all : build

build :
	docker compose up -d --build

up :
	docker compose up

down :
	docker compose down

push :
	docker compose push

db :
	rm -rf db/*

fclean : down
	docker compose down --rmi all
	docker volume rm $$(docker volume ls -q) -f
	docker system prune --volumes --force --all

re :
	make fclean
	make

ps :
	docker compose ps

clear :
	rm -rf ./db/*

.PHONY : db