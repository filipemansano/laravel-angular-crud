## PHP Larevel Crud
CRUD API with Laravel 8 and Bref framework to deploy app in any cloud system

this application makes use of the following features of the framework

- controller
- model
- migration
- seeder
- factories
- middleware
- commands
- routes (apiResource)
- auth (passaport)
- observer
- validation
- resource
- storage
- elloquent (orm)

for data storage the relational database `MySQL 8` was used

---

## Documentation
Run application and acess [this link](http://localhost:8000/docs/index.html) for read documentation of API (CRUD commands).

to populate cities, state and clients it's used a custom command
- `php artisan populate:cities`
- `php artisan populate:clients`

these commands are triggered in the flow of command `make migrate`

to populate cities and states it's used a external API of IBGE

---

## Tests
to run tests execute command: `make test`