@echo off
echo Starting Vercel deployment...
echo.

echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Logging into Vercel...
vercel login

echo.
echo Deploying to Vercel...
vercel --prod

echo.
echo Deployment complete!
pause