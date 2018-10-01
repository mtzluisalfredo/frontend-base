#!/bin/bash

nginx &
npm run start-dev &

until nc -z -v -w30 selenium 4444
do
  echo "Waiting for selenium server to start..."
  sleep 5
done

until nc -z -v -w30 $API_HOST_NAME $API_HOST_PORT
do
  echo "Waiting for api server to start..."
  sleep 5
done

until nc -z -v -w30 localhost 4000
do
  echo "Waiting for web server to start..."
  sleep 5
done

npm run test-e2e-headless
