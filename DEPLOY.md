# Vercel Deployment Instructions

## Quick Deploy

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from this directory**:
   ```bash
   cd c:\Users\USER\Downloads\dynamic-portfolio-dashboard\dynamic-portfolio-dashboard
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? (Press enter or type name)
   - In which directory is your code located? `./portfolio-dashboard/frontend`
   - Want to override settings? No

## Alternative: Deploy via GitHub

1. Push this folder to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Set **Root Directory** to: `portfolio-dashboard/frontend`
5. Click **Deploy**

## Important Settings

- **Root Directory**: `portfolio-dashboard/frontend`
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Your app will be live at: `https://your-project.vercel.app`
