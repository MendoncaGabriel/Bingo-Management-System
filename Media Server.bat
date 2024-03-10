@echo off
cd /d C:\Users\gabri\Documents\GitHub\media-server

start /min cmd /k npm run dev

start http://localhost
