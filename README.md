# Landright — How to Get Your Site Live

Follow these steps in order. Each one takes about 5–10 minutes.
Total time: ~45 minutes from zero to a live website.

---

## Before you start

You'll need to create 3 free accounts if you don't have them already:
- [github.com](https://github.com) — stores your code
- [supabase.com](https://supabase.com) — your database
- [vercel.com](https://vercel.com) — hosts your website

---

## STEP 1 — Set up your database (Supabase)

This is where all your listings, buyer inquiries, and seller leads get stored.

1. Go to [supabase.com](https://supabase.com) and sign up for a free account
2. Once logged in, click the green **"New project"** button
3. Give it a name (e.g. `landright`), choose a region close to you, set a database password, and click **"Create new project"**
4. Wait about 60 seconds for it to finish setting up
5. On the left sidebar, click **"SQL Editor"**
6. Click **"New query"** (top left of the editor)
7. Open the file called `supabase_setup.sql` from this project in any text editor (Notepad on Windows, TextEdit on Mac)
8. Select all the text (Ctrl+A / Cmd+A), copy it, and paste it into the Supabase SQL editor
9. Click the green **"Run"** button
10. You should see "Success. No rows returned" — that means it worked

**Now grab your API keys:**

11. In the left sidebar, click **"Project Settings"** (the gear icon at the bottom)
12. Click **"API"** in the settings menu
13. You'll see two values — copy them somewhere (Notepad is fine):
    - **Project URL** — looks like `https://abcdefgh.supabase.co`
    - **anon public key** — a long string starting with `eyJ...`

You'll need these in Step 3.

---

## STEP 2 — Put the code on GitHub

GitHub stores your code and connects to Vercel so your site auto-updates whenever you make changes.

**First, install Git on your computer (if you don't have it):**
- Windows: download from [git-scm.com](https://git-scm.com/download/win) and install it
- Mac: open Terminal and type `git --version` — if not installed, it'll prompt you to install it

**Then:**

1. Go to [github.com](https://github.com) and sign up / log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name it `landright`, leave everything else as default, click **"Create repository"**
4. On your computer, open **Terminal** (Mac) or **Command Prompt** (Windows)
5. Type the following commands one at a time, pressing Enter after each:

```
cd Desktop
```
*(This moves you to your Desktop — you can use any folder you like)*

Now drag the `landright` project folder onto the Terminal window — it will fill in the path for you, then press Enter. Or type:
```
cd /path/to/landright
```

Then run these commands one by one:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/landright.git
git push -u origin main
```

> ⚠️ Replace `YOURUSERNAME` with your actual GitHub username in the second-to-last line.

When it asks for a username/password, use your GitHub credentials. If it gives you trouble with passwords, GitHub may ask you to use a "Personal Access Token" — just Google "GitHub personal access token" and follow their 2-minute guide.

After this, refresh your GitHub page and you should see all your files there.

---

## STEP 3 — Deploy to Vercel (this makes it live on the internet)

1. Go to [vercel.com](https://vercel.com) and sign up **using your GitHub account** (click "Continue with GitHub")
2. Once logged in, click **"Add New..."** → **"Project"**
3. You'll see your `landright` repo listed — click **"Import"**
4. Before clicking Deploy, look for the **"Environment Variables"** section and add these three:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | The Project URL you copied in Step 1 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anon public key you copied in Step 1 |
| `NEXT_PUBLIC_ADMIN_PW` | A password you make up — this is what you'll use to log into your admin panel |

To add each one: type the name in the "Name" box, paste the value in the "Value" box, click "Add".

5. Once all 3 are added, click **"Deploy"**
6. Wait about 2 minutes — Vercel builds your site
7. When it says "Congratulations!" click **"Continue to Dashboard"**
8. You'll see a URL like `landright-abc123.vercel.app` — click it and your site is live!

---

## STEP 4 — Get a real domain name (optional but recommended)

Right now your site is at a ugly Vercel URL. To get something like `landright.com`:

1. Go to [namecheap.com](https://namecheap.com) and search for the domain you want
2. Buy it (~$10–15/year)
3. Back in Vercel, go to your project → **"Settings"** → **"Domains"**
4. Type your domain name and click **"Add"**
5. Vercel will show you some DNS records — copy them
6. Go back to Namecheap → **"Domain List"** → click **"Manage"** next to your domain → click **"Advanced DNS"**
7. Add the records Vercel gave you
8. Wait 10–30 minutes and your domain will point to your site

---

## STEP 5 — Log into your admin panel

Once your site is live:

1. Go to `yoursite.com/admin`
2. Enter the password you set as `NEXT_PUBLIC_ADMIN_PW` in Step 3
3. You're in — from here you can:
   - Click **"New listing"** to add a mineral rights listing
   - Click **"Listings"** to edit or delete existing ones
   - Click **"Inquiries"** to see everyone who has filled out the buyer inquiry form

---

## How to add your first listing

1. Go to `/admin` and log in
2. Click **"New listing"** in the left sidebar
3. You'll see 3 tabs — fill them out:
   - **Listing details** — title, acreage, price, formation, description, etc.
   - **Location** — state, county, legal description, township/range/section
   - **Seller info (private)** — seller's contact info and your private notes. This is NEVER shown to the public.
4. At the bottom, click:
   - **"Save"** — saves it as a draft (hidden from the public)
   - **"Save & publish"** — makes it live on the site immediately

---

## How to update your site in the future

Any time you want to make code changes (your developer does this, or you if you get comfortable):

1. Make the changes in the `landright` folder on your computer
2. Open Terminal, navigate to the folder, and run:
```
git add .
git commit -m "describe what you changed"
git push
```
3. Vercel automatically detects the push and redeploys in about 60 seconds — no action needed

---

## Monthly costs once live

| Service | Free tier | Paid |
|---------|-----------|------|
| Supabase | Free up to 500MB / 50k rows | $25/mo after |
| Vercel | Free up to 100GB bandwidth | $20/mo after |
| Domain name | — | ~$12/year |
| **Total to start** | **~$1/month** | |

You won't hit the paid tiers until you have serious traffic and hundreds of listings — plenty of runway.

---

## Something went wrong?

Most common issues:

**Site says "Application error"** — your environment variables in Vercel are missing or wrong. Go to Vercel → your project → Settings → Environment Variables and double-check them.

**Admin panel won't accept my password** — make sure the password you're typing matches exactly what you set for `NEXT_PUBLIC_ADMIN_PW` in Vercel. It's case-sensitive.

**Listings aren't showing up** — make sure you clicked "Save & publish" not just "Save" in the admin panel. Draft listings are hidden from the public.

**The SQL setup gave an error** — you may have only run part of it. Go back to Supabase SQL Editor, paste the whole `supabase_setup.sql` file again, and run it.

---

*Built with Next.js, Tailwind CSS, and Supabase. Hosted on Vercel.*
