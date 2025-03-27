@REM @echo off
@REM setlocal enabledelayedexpansion
@REM title Playwright Test Runner
@REM color 0A

@REM echo Playwright Test Automation Suite
@REM echo ==============================
@REM echo.

@REM :menu
@REM echo Select an option:
@REM echo 1. Run all tests
@REM echo 2. Run smoke tests
@REM echo 3. Run regression tests
@REM echo 4. Run tests in headed mode
@REM echo 5. Run with specific browser (Chrome/Firefox/Safari)
@REM echo 6. Debug mode
@REM echo 7. UI mode
@REM echo 8. Generate report
@REM echo 9. Exit
@REM echo.

@REM set /p choice=Enter your choice (1-9): 

@REM if "%choice%"=="1" goto run_all
@REM if "%choice%"=="2" goto run_smoke
@REM if "%choice%"=="3" goto run_regression
@REM if "%choice%"=="4" goto run_headed
@REM if "%choice%"=="5" goto select_browser
@REM if "%choice%"=="6" goto debug_mode
@REM if "%choice%"=="7" goto ui_mode
@REM if "%choice%"=="8" goto generate_report
@REM if "%choice%"=="9" goto end

@REM echo Invalid choice. Please try again.
@REM echo.
@REM goto menu

@REM :run_all
@REM echo Running all tests...
@REM npx playwright test
@REM goto end_run

@REM :run_smoke
@REM echo Running smoke tests...
@REM npx playwright test --grep @smoke
@REM goto end_run

@REM :run_regression
@REM echo Running regression tests...
@REM npx playwright test --grep @regression
@REM goto end_run

@REM :run_headed
@REM echo Running tests in headed mode...
@REM npx playwright test --headed
@REM goto end_run

@REM :select_browser
@REM echo.
@REM echo Select browser:
@REM echo 1. Chrome
@REM echo 2. Firefox
@REM echo 3. Safari
@REM echo.
@REM set /p browser=Enter browser choice (1-3): 

@REM if "%browser%"=="1" (
@REM   echo Running tests in Chrome...
@REM   npx playwright test --project=chromium
@REM   goto end_run
@REM )
@REM if "%browser%"=="2" (
@REM   echo Running tests in Firefox...
@REM   npx playwright test --project=firefox
@REM   goto end_run
@REM )
@REM if "%browser%"=="3" (
@REM   echo Running tests in Safari...
@REM   npx playwright test --project=webkit
@REM   goto end_run
@REM )

@REM echo Invalid browser selection.
@REM goto select_browser

@REM :debug_mode
@REM echo Running in debug mode...
@REM npx playwright test --debug
@REM goto end_run

@REM :ui_mode
@REM echo Running in UI mode...
@REM npx playwright test --ui
@REM goto end_run

@REM :generate_report
@REM echo Generating HTML report...
@REM npx playwright show-report
@REM goto end_run

@REM :end_run
@REM echo.
@REM echo Tests completed!
@REM echo.
@REM pause
@REM goto menu

@REM :end
@REM echo Exiting...
@REM exit /b 0


@echo off
setlocal enabledelayedexpression
title Multi-Site Playwright Testing
color 0A

echo Multi-Site Playwright Test Runner
echo ===============================
echo.

:menu
echo Select an option:
echo.
echo --- Site Selection ---
echo 1. Run All Sites
echo 2. SauceDemo Tests Only
echo 3. The Internet Tests Only
echo 4. DemoQA Tests Only
echo.
echo --- Functionality ---
echo 5. Form Tests
echo 6. Table Tests
echo 7. File Operation Tests
echo 8. Mouse Action Tests
echo 9. Visual Tests
echo.
echo --- Browser Selection ---
echo 10. Chrome Only
echo 11. Firefox Only
echo 12. Safari (WebKit) Only
echo 13. Mobile Tests
echo.
echo --- Other Options ---
echo 14. Run with UI Mode
echo 15. Generate Report
echo 16. Update Visual Baselines
echo 17. Exit
echo.

set /p choice=Enter your choice (1-17): 

if "%choice%"=="1" goto all_sites
if "%choice%"=="2" goto saucedemo
if "%choice%"=="3" goto internet
if "%choice%"=="4" goto demoqa
if "%choice%"=="5" goto form_tests
if "%choice%"=="6" goto table_tests
if "%choice%"=="7" goto file_tests
if "%choice%"=="8" goto mouse_tests
if "%choice%"=="9" goto visual_tests
if "%choice%"=="10" goto chrome_only
if "%choice%"=="11" goto firefox_only
if "%choice%"=="12" goto safari_only
if "%choice%"=="13" goto mobile_tests
if "%choice%"=="14" goto ui_mode
if "%choice%"=="15" goto generate_report
if "%choice%"=="16" goto update_visuals
if "%choice%"=="17" goto exit

echo Invalid selection, please try again.
goto menu

:all_sites
echo Running tests for all sites...
npx playwright test
goto end

:saucedemo
echo Running SauceDemo tests...
npx playwright test --grep "@saucedemo"
goto end

:internet
echo Running The Internet tests...
npx playwright test --grep "@internet"
goto end

:demoqa
echo Running DemoQA tests...
npx playwright test --grep "@demoqa"
goto end

:form_tests
echo Running form tests...
npx playwright test --grep "@form"
goto end

:table_tests
echo Running table tests...
npx playwright test --grep "@table"
goto end

:file_tests
echo Running file operation tests...
npx playwright test --grep "@file"
goto end

:mouse_tests
echo Running mouse action tests...
npx playwright test --grep "@mouse"
goto end

:visual_tests
echo Running visual tests...
npx playwright test --grep "@visual"
goto end

:chrome_only
echo Running tests in Chrome only...
npx playwright test --project=*chrome*
goto end

:firefox_only
echo Running tests in Firefox only...
npx playwright test --project=*firefox*
goto end

:safari_only
echo Running tests in Safari/WebKit only...
npx playwright test --project=*webkit*
goto end

:mobile_tests
echo Running tests on mobile viewports...
npx playwright test --project=*mobile*
goto end

:ui_mode
echo Running in UI mode...
npx playwright test --ui
goto end

:generate_report
echo Generating report...
npx playwright show-report
goto end

:update_visuals
echo Updating visual baselines...
npx playwright test --grep "@visual" --update-snapshots
goto end

:exit
echo Exiting...
exit /b 0

:end
echo.
echo Tests completed!
echo.
pause
goto menu