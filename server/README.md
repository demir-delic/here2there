# Here2There Backend

For a general overview of Here2There, see the [project README](../README.md).

## Built With

- [Django](https://www.djangoproject.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Prerequisites

- [Python 3.9](https://www.python.org/downloads/)
- [Pipenv](https://pypi.org/project/pipenv/)
- [PostgreSQL 13](https://www.postgresql.org/)

### Install and Run

1. Navigate to server directory

```sh
cd v29-bears-team-07/server
```

2. Set up virtual env and install dependencies

```sh
pipenv shell
pipenv install --ignore-pipfile
```

3. Install git hooks

```sh
pre-commit install
```

4. Create a `.env` file in server_api/server_api by copying and renaming [.env.example](./server_api/server_api/.env.example)
5. Generate a secret key. After generating the key, add it to and add to `.env` (SECRET_KEY=<secret_key>).

```sh
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

6. Create a PostgreSQL database named here2there

```sh
psql
CREATE DATABASE here2there;
\q
```

7. Fill in the rest of the environment variables

```sh
DATABASE_NAME=here2there # the name of the database you created
DATABASE_USER=postgres # default if no postgres user is created
DATABASE_PASSWORD= # default if no postgres user is created
```

8. Apply migrations

```sh
cd server_api
python manage.py migrate
```

9. Check if migrations were applied correctly

```sh
psql
\c here2there;
\dt
\d+ destinations_destination
\q
```

10. Run server

```sh
cd server_api
python manage.py runserver
```

11. If you haven't already, set up and run the [frontend](../frontend/README.md) as well. It's required to run the app locally.
