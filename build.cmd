@echo Off
pushd %~dp0
setlocal

:Build
call npm install
call npm run validate

if %ERRORLEVEL% neq 0 goto BuildFail

call npm pack

if %ERRORLEVEL% neq 0 goto BuildFail

goto BuildSuccess

:BuildFail
echo.
echo *** BUILD FAILED ***
goto End

:BuildSuccess
echo.
echo *** BUILD SUCCEEDED ***
goto End

:End
echo.
call npm run test-view-stop

:: node.exe continues to run on a TeamCity build agent,
:: causing problems on the next build.
:: This could disrupt other unrelated node.exe processes running
:: on the machine, but it should fix this issue (for now, at least).
call taskkill /F /IM node.exe
popd
exit /B %ERRORLEVEL%
