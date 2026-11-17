@echo off
set "msg=%~1"
if "%msg%"=="" set "msg=Update site"
git add -A
git commit -m "%msg%"
git push origin main
if errorlevel 1 (
  echo.
  echo *** PUSH FAILED - read the message above ***
)
echo.
git status -sb
pause
