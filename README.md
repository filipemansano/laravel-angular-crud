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

## Install and configure


First clone repository
```bash
git clone https://github.com/filipemansano/php-client-crud.git
```

> It's necessary have the [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

now run command below to start a docker-machine and install the dependencies
```bash
make build && make install && make migrate
```

Avaliables `make` commands
command | description
--- | ---
bash | enter bash mode on `app` docker-instance
migrate | perform initials database operations
build | crete a docker containers
install | install all dependencies
test | execute all tests
stop | stop all docker containers

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

---

## Windows user
to execute command `make` please see this [tutorial](http://gnuwin32.sourceforge.net/packages/make.htm), or open `Makefile` file and copy-paste commands in your terminal.
