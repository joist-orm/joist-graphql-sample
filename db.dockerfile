FROM postgres:16.0
ENV APP_DBNAME=sample_app
ENV APP_USERNAME=sample_user
ENV APP_PASSWORD=local
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres

# Create the init.sh file. This file is only ran once; if you need to re-run it, use `docker-compose rm db`.
RUN <<-EOF
cat > /init.sh <<'SCRIPT'
#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_DB}" <<-EOSQL
  ALTER SYSTEM SET log_connections = 'on';
  ALTER SYSTEM SET log_disconnections = 'on';
  ALTER SYSTEM SET log_statement = 'all';
  CREATE USER "${APP_USERNAME}" PASSWORD '${APP_PASSWORD}';
  CREATE DATABASE "${APP_DBNAME}" OWNER "${APP_USERNAME}";
EOSQL
SCRIPT
EOF
RUN chmod u+x /init.sh && mv /init.sh /docker-entrypoint-initdb.d/

# Create the reset.sh file
RUN <<-EOF
cat > /reset.sh <<'SCRIPT'
#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_DB}" <<-EOSQL
  DROP DATABASE "${APP_DBNAME}";
  CREATE DATABASE "${APP_DBNAME}" OWNER "${APP_USERNAME}";
EOSQL
SCRIPT
EOF
RUN chmod u+x /reset.sh

# Create the console.sh file
RUN <<-EOF
cat > /console.sh <<'SCRIPT'
#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "${APP_USERNAME}" --dbname "${APP_DBNAME}"
SCRIPT
EOF
RUN chmod u+x /console.sh

CMD ["postgres", "-c", "fsync=off"]
