#!/bin/bash

# GitHub Repository Setup Script using Access Token

echo "🚀 NYCN Ireland - GitHub Setup"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username is required. Exiting."
    exit 1
fi

# Get GitHub token
read -sp "Enter your GitHub access token: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token is required. Exiting."
    exit 1
fi

REPO_NAME="nycn-ireland"
REPO_DESCRIPTION="NYCN Ireland - National Youth Council of Nigeria, Ireland Chapter Website"

echo ""
echo "📦 Creating GitHub repository..."

# Create repository via GitHub API
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESCRIPTION\",\"private\":false}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Repository created successfully!"
    echo ""
    
    # Add remote and push
    echo "📤 Setting up remote and pushing code..."
    
    # Remove existing remote if any
    git remote remove origin 2>/dev/null
    
    # Add remote with token
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    
    # Push to GitHub
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🔗 Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
        echo ""
        echo "🔗 Next steps - Connect to Vercel:"
        echo "1. Go to: https://vercel.com/qbs-projects-2b124455/nycnie-main/settings/git"
        echo "2. Click 'Connect Git Repository'"
        echo "3. Select your GitHub repository: ${GITHUB_USERNAME}/${REPO_NAME}"
        echo "4. Vercel will auto-deploy on every push! 🎉"
        
        # Remove token from remote URL for security (use credential helper instead)
        git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    else
        echo ""
        echo "❌ Error pushing to GitHub. Please check your token permissions."
    fi
elif [ "$HTTP_CODE" -eq 422 ]; then
    echo "⚠️  Repository already exists. Adding remote and pushing..."
    git remote remove origin 2>/dev/null
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to existing repository!"
        git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    fi
else
    echo "❌ Error creating repository. HTTP Code: $HTTP_CODE"
    echo "Response: $BODY"
    exit 1
fi

