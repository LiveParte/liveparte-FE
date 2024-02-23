#!/bin/bash

git checkout feat/docker

git pull origin feat/docker

docker compose up -d --build frontend
