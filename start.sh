#!/bin/bash
cd backend

npm i && node server.js &>/dev/null &

cd ../frontend

npm i && npm start

