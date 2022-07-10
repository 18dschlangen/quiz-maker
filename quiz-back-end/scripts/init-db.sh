#!/bin/bash/env bash
# Helper script for local development, to create databases.

set -o nounset -o errexit -o pipefail

. env.sh

psql postgres -h "$hostname" -p "$port" -U "$user" sslmode=disable <<EOF
CREATE DATABASE "quiz-data";
EOF