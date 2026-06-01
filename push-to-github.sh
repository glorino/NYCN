#!/bin/bash

# GitHub Repository Setup Script
# Run this after creating your GitHub repository

echo "🚀 NYCN Ireland - GitHub Setup"
echo ""
echo "Please create a GitHub repository first:"
echo "1. Go to: https://github.com/new"
echo "2. Name it: nycn-ireland (or your preferred name)"
echo "3. DO NOT initialize with README/gitignore"
echo "4. Click 'Create repository'"
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/nycn-ireland.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "📦 Adding remote repository..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🔗 Next steps:"
    echo "1. Go to: https://vercel.com/qbs-projects-2b124455/nycnie-main/settings/git"
    echo "2. Click 'Connect Git Repository'"
    echo "3. Select your GitHub repository"
    echo "4. Vercel will auto-deploy on every push! 🎉"
else
    echo ""
    echo "❌ Error pushing to GitHub. Please check:"
    echo "   - Your repository URL is correct"
    echo "   - You're logged into GitHub"
    echo "   - You have push permissions"
fi

