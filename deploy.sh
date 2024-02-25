#!/bin/bash

git checkout staging

git pull origin staging

docker compose up -d --build frontend
