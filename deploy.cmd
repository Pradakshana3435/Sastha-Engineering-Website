@echo off
set "msg=%~1"
if "%msg%"=="" set "msg=Update site"
git add -A
git commit -m "%msg%"
git push