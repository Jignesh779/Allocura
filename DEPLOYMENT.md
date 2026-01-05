# Allocura Deployment Setup

## Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Allocura investment portfolio planner"
```

## Step 2: Create GitHub Repository
1. Go to https://github.com/jignesh779
2. Click "New repository"
3. Repository name: `Allocura`
4. Description: `Rule-Based Investment Portfolio Planner for India`
5. Make it Public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 3: Connect to GitHub
```bash
git branch -M main
git remote add origin https://github.com/jignesh779/Allocura.git
git push -u origin main
```

## Step 4: Enable GitHub Pages
1. Go to your repository: https://github.com/jignesh779/Allocura
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy on push to main branch

## Your live site will be available at:
https://jignesh779.github.io/Allocura/

## Commands to run in your terminal:
```bash
cd "c:\Users\HAI\Downloads\Allocura\savvy-invest-india-main"
git init
git add .
git commit -m "Initial commit: Allocura investment portfolio planner"
git branch -M main
git remote add origin https://github.com/jignesh779/Allocura.git
git push -u origin main
```