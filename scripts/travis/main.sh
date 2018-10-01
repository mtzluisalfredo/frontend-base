#!/bin/bash

set -e

# Download docker base frontend image and re-tag it.
docker pull $DOCKER_REGISTRY_HOSTNAME/regiztra-frontend
docker tag $DOCKER_REGISTRY_HOSTNAME/regiztra-frontend regiztra-frontend

make build
make test
make test-down
./scripts/travis/push-images.sh
