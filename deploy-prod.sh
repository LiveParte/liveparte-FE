#!/bin/bash

git checkout main

git pull origin main

docker compose up -d --build frontend-prod
