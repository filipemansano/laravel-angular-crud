migrate:
	docker-compose run --rm php bash -c "php artisan migrate:refresh; php artisan db:seed; php artisan populate:cities; php artisan populate:clients; php artisan passport:client --password --name=webapp --provider=users"

start:
	docker-compose up --force-recreate --remove-orphans -d

stop:
	docker-compose down

install:
	docker-compose run --rm php bash -c "cp -n '.env.example' '.env'; php composer.phar install"

test:
	docker-compose run --rm php bash -c "./vendor/bin/phpunit"