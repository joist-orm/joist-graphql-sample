#!/usr/bin/env bash
set -euo pipefail

published_port="$(docker compose port db 5432)"
port="${published_port##*:}"

if [[ -z "${port}" ]]; then
  echo "Unable to determine db port from docker compose" >&2
  exit 1
fi

database_url="postgres://sample_user:local@localhost:${port}/sample_app"

if [[ -f .env ]]; then
  tmp="$(mktemp)"
  grep -v '^DATABASE_URL=' .env > "${tmp}" || true
  printf 'DATABASE_URL=%s\n' "${database_url}" >> "${tmp}"
  mv "${tmp}" .env
else
  printf 'DATABASE_URL=%s\n' "${database_url}" > .env
fi

echo "Wrote DATABASE_URL to .env using db port ${port}"
