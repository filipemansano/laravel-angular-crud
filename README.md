## Introduction
This project have 2 sub-project, an API with Laravel 8 and a Frontend with Angular 11, each project have your own readme

- [click here](https://github.com/filipemansano/laravel-angular-crud/tree/master/backend) to access API readme
- [click here](https://github.com/filipemansano/laravel-angular-crud/tree/master/frontned) to access Frontend readme

---

## Environment

This project uses docker-compose to prepare the development environment, for production the [serverless framework](https://serverless.com/) would be used to deploy the backend and AWS S3 Static Site to deploy the angular production files (using github actions)

---

## Install and configure


First clone repository
```bash
git clone https://github.com/filipemansano/laravel-angular-crud.git
```

> It's necessary have the [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

now run command below to start a docker-machine
```bash
make start
```

after all containers is up install the dependencies
```bash
make install && make migrate
```

Avaliables `make` commands
command | description
--- | ---
migrate | perform initials database operations
start | crete a docker containers
install | install all dependencies
test | execute all tests
stop | stop all docker containers

---

## Windows user
to execute command `make` please see this [tutorial](http://gnuwin32.sourceforge.net/packages/make.htm), or open `Makefile` file and copy-paste commands in your terminal.
