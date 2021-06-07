migrate:
	docker-compose run --rm php bash -c "php artisan migrate:refresh; php artisan db:seed; php artisan populate:cities; php artisan populate:clients; php artisan passport:client --password --name=webapp --provider=users"

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose stop

install:
	docker-compose run --rm php bash -c "cp -n '.env.example' '.env'; php composer.phar install; php artisan passport:keys"

test:
	docker-compose run --rm php bash -c "./vendor/bin/phpunit"