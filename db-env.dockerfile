FROM docker:27-cli

RUN <<'EOF'
cat > /usr/local/bin/write-db-env <<'SCRIPT'
#!/bin/sh
set -eu

write_db_env() {
  : "${TARGET_SERVICE:?TARGET_SERVICE is required}"
  : "${TARGET_PORT:?TARGET_PORT is required}"
  : "${ENV_VAR_NAME:?ENV_VAR_NAME is required}"
  : "${ENV_VAR_TEMPLATE:?ENV_VAR_TEMPLATE is required}"

  env_file="${ENV_FILE:-.env}"
  host_name="${HOST_NAME:-localhost}"
  target_port="${TARGET_PORT}"

  case "${target_port}" in
    */*) ;;
    *) target_port="${target_port}/tcp" ;;
  esac

  project="$(docker inspect "$(hostname)" --format '{{ index .Config.Labels "com.docker.compose.project" }}')"
  target_container="$(docker ps -q --filter "label=com.docker.compose.project=${project}" --filter "label=com.docker.compose.service=${TARGET_SERVICE}")"

  if [ -z "${target_container}" ]; then
    echo "Unable to find ${TARGET_SERVICE} container" >&2
    return 1
  fi

  published_port="$(docker port "${target_container}" "${target_port}")"
  port="${published_port##*:}"

  if [ -z "${port}" ]; then
    echo "Unable to determine ${TARGET_SERVICE} port ${target_port} from docker compose" >&2
    return 1
  fi

  env_var_value="$(printf '%s' "${ENV_VAR_TEMPLATE}" | sed "s/{HOST}/${host_name}/g; s/{PORT}/${port}/g")"

  if [ -f "${env_file}" ]; then
    tmp="$(mktemp)"
    grep -v "^${ENV_VAR_NAME}=" "${env_file}" > "${tmp}" || true
    printf '%s=%s\n' "${ENV_VAR_NAME}" "${env_var_value}" >> "${tmp}"
    mv "${tmp}" "${env_file}"
  else
    printf '%s=%s\n' "${ENV_VAR_NAME}" "${env_var_value}" > "${env_file}"
  fi

  chown "$(stat -c '%u:%g' .)" "${env_file}"
  touch /tmp/db-env-ready
  echo "Wrote ${ENV_VAR_NAME} to ${env_file} using ${TARGET_SERVICE} port ${port}"
}

refresh_seconds="${REFRESH_SECONDS:-10}"

while true; do
  write_db_env || true
  sleep "${refresh_seconds}"
done
SCRIPT
EOF

RUN chmod +x /usr/local/bin/write-db-env

CMD ["write-db-env"]
