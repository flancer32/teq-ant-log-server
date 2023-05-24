# teq-ant-log-server

Log aggregation server for TeqFW apps.

## Setup

This app uses Knex.js to connect to PostgreSQL or MariaDB/MySQL databases.

### Create Database

#### PostgreSQL:

```
$ sudo -u postgres psql
...
postgres=# create user logs_agg password '...';
postgres=# create database logs_agg owner logs_agg;
postgres=# \q
```

#### MariaDB/MySQL:

```
root@host:/# mariadb
...
MariaDB [(none)]> CREATE DATABASE logs_agg;
MariaDB [(none)]> CREATE USER logs_agg@localhost IDENTIFIED BY '...';
MariaDB [(none)]> GRANT ALL PRIVILEGES ON logs_agg.* TO logs_agg@localhost;
MariaDB [(none)]> FLUSH PRIVILEGES;
```

## Web Requests Handler

The handler processes requests to `./log-agg-beacon/` space.