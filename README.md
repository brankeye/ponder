## README

## Docker

# run postgres

`docker run --name <CONTAINER_NAME> -p 5432:5432 -e POSTGRES_PASSWORD=<PASSWORD> -d postgres`

# enter postgres container

`docker exec -it <CONTAINER_NAME> /bin/bash`

# create new postgres user

```
psql -U postgres
CREATE USER <name>;
CREATE DATABASE <name_db>;
GRANT ALL PRIVILEGES ON DATABASE <name_db> TO <name>;
ALTER USER <username> WITH ENCRYPTED PASSWORD '<password>';
```

# save docker image to .tgz

`docker save <image_name> | gzip > <image_name>.tgz`

# load docker image

`gunzip -c <image_name>.tgz | docker load`
