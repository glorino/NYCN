# Supabase Setup Guide

## ✅ Completed Setup

1. ✅ Supabase project created: **NYCN Ireland**
2. ✅ Database schema created with tables:
   - `contacts` - Contact form submissions
   - `members` - Membership registrations
   - `events` - Event management
3. ✅ Supabase client library installed
4. ✅ Forms updated to use Supabase

## 🔧 Required: Environment Variables

You need to create a `.env.local` file in the root directory with your Supabase credentials:

```bash
# Create .env.local file
touch .env.local
```

Add the following content to `.env.local`:

```env
VITE_SUPABASE_URL=https://wdwpwhwfhhxmcekpmvyq.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_5EsVYhQYAeCWdTw7qwtPLA_7iYWxsQA
```

**Important:** The `.env.local` file is already in `.gitignore` and will not be committed to git.

## 📊 Database Schema

### Contacts Table
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `email` (TEXT)
- `message` (TEXT)
- `created_at` (TIMESTAMP)

### Members Table
- `id` (UUID, Primary Key)
- `full_name` (TEXT)
- `whatsapp` (TEXT)
- `email` (TEXT)
- `county` (TEXT)
- `created_at` (TIMESTAMP)

### Events Table
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `date` (DATE)
- `time` (TEXT, optional)
- `location` (TEXT)
- `description` (TEXT)
- `image` (TEXT, optional)
- `category` (TEXT, optional)
- `attendees` (TEXT, optional)
- `featured` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔒 Security

Row Level Security (RLS) is enabled on all tables:
- **Contacts & Members**: Public can insert, only authenticated users can read
- **Events**: Public can read, only authenticated users can write

## 🚀 Usage

### Contact Form
The contact form now automatically saves submissions to the `contacts` table.

### Join Us Modal
The membership registration form saves to the `members` table.

### Events
You can query events from the database or continue using the hardcoded events. To use database events, update `EventsPage.tsx` to fetch from Supabase.

## 📝 Next Steps

1. **Create `.env.local`** file with the credentials above
2. **Restart the dev server** after creating the env file
3. **Test the forms** - submissions should now save to Supabase
4. **View data** in Supabase Dashboard: https://supabase.com/dashboard/project/wdwpwhwfhhxmcekpmvyq

## 🔗 Supabase Dashboard

Access your project dashboard:
- **URL**: https://supabase.com/dashboard/project/wdwpwhwfhhxmcekpmvyq
- **Project ID**: wdwpwhwfhhxmcekpmvyq
- **Region**: eu-west-1 (Ireland)

## 🛠️ Troubleshooting

If you encounter errors:
1. Make sure `.env.local` exists and has the correct values
2. Restart the dev server: `npm run dev`
3. Check browser console for errors
4. Verify Supabase project is active in the dashboard

