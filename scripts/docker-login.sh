#!/bin/bash

if [ "$DOCKER_REGISTRY" == "AMAZON_ECR" ]; then
  eval $(aws ecr get-login --no-include-email --region $AWS_ECR_REGION)
else
  docker login -u="$DOCKER_USER" -p "$DOCKER_PASS"
fi
