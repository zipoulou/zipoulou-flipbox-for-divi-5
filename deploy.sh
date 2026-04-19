#!/usr/bin/env bash
#
# Deploy Tangible Modules for Divi 5 to an O2SWITCH WordPress install.
# Uses plink + pscp (PuTTY tools) — credentials loaded from .env.local.
#
# Pre-requisites:
#   - Node + npm available locally (`npm run build` must succeed)
#   - plink, pscp in PATH
#   - .env.local present (copy .env.example and fill in)
#
# Usage: ./deploy.sh
#
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env.local ]; then
    echo "ERROR: .env.local not found. Copy .env.example to .env.local and fill in credentials." >&2
    exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

: "${O2_HOST:?O2_HOST not set}"
: "${O2_PORT:=22}"
: "${O2_USER:?O2_USER not set}"
: "${O2_PASS:?O2_PASS not set}"
: "${O2_PLUGIN_DIR:?O2_PLUGIN_DIR not set}"

echo ">> Building production bundle..."
npm run build

echo ">> Creating zip archive..."
npm run zip

PKG_NAME=$(node -p "require('./package.json').name")
PKG_VERSION=$(node -p "require('./package.json').version")
ZIP_FILE="${PKG_NAME}-v${PKG_VERSION}.zip"

if [ ! -f "$ZIP_FILE" ]; then
    echo "ERROR: zip file not produced: $ZIP_FILE" >&2
    exit 1
fi

O2_HOME="${O2_HOME:-/home/${O2_USER}}"
REMOTE_ZIP="${O2_HOME}/${ZIP_FILE}"

echo ">> Uploading $ZIP_FILE to ${O2_HOST}:${REMOTE_ZIP}..."
pscp -P "$O2_PORT" -l "$O2_USER" -pw "$O2_PASS" -batch \
    "$ZIP_FILE" "${O2_USER}@${O2_HOST}:${REMOTE_ZIP}"

echo ">> Installing on remote at ${O2_PLUGIN_DIR}/${PKG_NAME}..."
plink -ssh -P "$O2_PORT" -l "$O2_USER" -pw "$O2_PASS" -batch "$O2_HOST" "
    set -e
    cd '${O2_PLUGIN_DIR}'
    rm -rf '${PKG_NAME}'
    mkdir -p '${PKG_NAME}'
    cd '${PKG_NAME}'
    unzip -oq '${REMOTE_ZIP}'
    rm -f '${REMOTE_ZIP}'
"

rm -f "$ZIP_FILE"
echo ">> Done. Plugin deployed to ${O2_HOST}:${O2_PLUGIN_DIR}/${PKG_NAME}"
