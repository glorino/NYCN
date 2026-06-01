# GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `nycn-ireland` (or your preferred name)
3. Description: "NYCN Ireland - National Youth Council of Nigeria, Ireland Chapter Website"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a URL like:
- `https://github.com/YOUR_USERNAME/nycn-ireland.git` (HTTPS)
- `git@github.com:YOUR_USERNAME/nycn-ireland.git` (SSH)

## Step 3: Run These Commands

Once you have your repository URL, run these commands in your terminal:

```bash
cd /Users/theaiguy/Downloads/nycnie-main

# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/nycn-ireland.git

# Push to GitHub
git push -u origin main
```

## Step 4: Connect to Vercel

After pushing to GitHub:

1. Go to: https://vercel.com/qbs-projects-2b124455/nycnie-main/settings/git
2. Click **"Connect Git Repository"**
3. Select your GitHub repository
4. Vercel will automatically deploy on every push!

## Alternative: Use GitHub CLI (if you prefer)

If you want to install GitHub CLI:

```bash
# Install GitHub CLI
brew install gh

# Login to GitHub
gh auth login

# Create repository and push
gh repo create nycn-ireland --public --source=. --remote=origin --push
```

