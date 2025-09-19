# Bus Reservation System - Deployment Guide

## Prerequisites
- Node.js (v18 or higher)
- Git
- Supabase account
- Hosting platform account (Vercel/Netlify/GitHub Pages)

## Backend Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your Project URL and Anon Key

### 2. Set up Database Schema
Run the SQL commands provided in the main deployment guide to create all necessary tables.

### 3. Configure Authentication
1. Go to Authentication → Settings in Supabase dashboard
2. Enable email authentication
3. Configure redirect URLs for your domain

## Frontend Deployment

### 1. Environment Variables
Create a `.env.production` file in your project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Build the Project
```bash
npm run build:prod
```

### 3. Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build:prod
netlify deploy --prod --dir=dist
```

### 5. Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Database tables are created
- [ ] Authentication is working
- [ ] All features are functional
- [ ] SSL certificate is active
- [ ] Domain is configured (if using custom domain)

## Troubleshooting

### Common Issues:
1. **CORS errors**: Check Supabase project settings
2. **Authentication not working**: Verify redirect URLs
3. **Database connection issues**: Check environment variables
4. **Build failures**: Check for TypeScript errors

### Support:
- Check Supabase documentation
- Review Vercel/Netlify deployment logs
- Check browser console for errors
