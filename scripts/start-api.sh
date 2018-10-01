#!/bin/bash

set -e

docker pull $DOCKER_REGISTRY_HOSTNAME/regiztra-api
docker pull $DOCKER_REGISTRY_HOSTNAME/regiztra-user
docker pull $DOCKER_REGISTRY_HOSTNAME/regiztra-notification

docker tag $DOCKER_REGISTRY_HOSTNAME/regiztra-api regiztra-api
docker tag $DOCKER_REGISTRY_HOSTNAME/regiztra-user regiztra-user
docker tag $DOCKER_REGISTRY_HOSTNAME/regiztra-notification regiztra-notification

git clone https://${GITHUB_TOKEN}@github.com/adminregiztra/regiztra-backend.git
cd regiztra-backend

chmod +x services/api/scripts/startup.integration.sh
chmod +x services/user/scripts/startup.integration.sh

../scripts/torus run -e travis -s travis --project backend -- \
		docker-compose -f docker-compose.yml \
                    -f docker-compose.dev.yml \
                		-f services/api/docker-compose.dev.yml \
                		-f docker-compose.integration.yml up -d api
