-- Run this entire script in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run

-- =====================
-- LISTINGS
-- =====================
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Location
  state text not null,
  county text not null,
  legal_description text not null default '',
  township text,
  range text,
  section text,
  latitude numeric,
  longitude numeric,

  -- Details
  title text not null,
  listing_type text not null default 'minerals',
  net_mineral_acres numeric not null default 0,
  asking_price numeric,
  royalty_rate text,
  lease_status text not null default 'unknown',
  formation text,
  operator text,
  producing_wells int,
  permitted_wells int,

  -- Content
  description text not null default '',
  highlights text[],
  status text not null default 'draft',

  -- Seller info (private — never exposed via public API)
  seller_name text,
  seller_email text,
  seller_phone text,
  internal_notes text
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger listings_updated_at
  before update on listings
  for each row execute function update_updated_at();

-- =====================
-- BUYER INQUIRIES
-- =====================
create table if not exists buyer_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  listing_id uuid references listings(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text
);

-- =====================
-- BUYER REGISTRATIONS
-- =====================
create table if not exists buyer_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  basins text[],
  min_acres text,
  max_budget text,
  notes text
);

-- =====================
-- VALUATION REQUESTS (seller leads)
-- =====================
create table if not exists valuation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  state text,
  county text,
  legal_description text,
  acres text,
  lease_status text,
  formation text,
  notes text,
  seller_name text,
  seller_email text,
  seller_phone text
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
-- Public can read active/pending/sold listings (not drafts, not seller info)
alter table listings enable row level security;

create policy "Public read active listings"
  on listings for select
  using (status != 'draft');

-- Public can insert inquiries (buyers submitting forms)
alter table buyer_inquiries enable row level security;

create policy "Anyone can submit inquiry"
  on buyer_inquiries for insert
  with check (true);

-- Public can insert registrations
alter table buyer_registrations enable row level security;

create policy "Anyone can register as buyer"
  on buyer_registrations for insert
  with check (true);

-- Public can insert valuation requests
alter table valuation_requests enable row level security;

create policy "Anyone can submit valuation request"
  on valuation_requests for insert
  with check (true);

-- NOTE: For admin reads/writes, use your Supabase service role key in a
-- server-side API route, or temporarily disable RLS for your own testing.
-- For production admin access, add Supabase Auth and create admin policies.

-- =====================
-- SAMPLE LISTING (optional — delete after testing)
-- =====================
insert into listings (
  title, state, county, legal_description,
  township, range, section,
  listing_type, net_mineral_acres, asking_price,
  royalty_rate, lease_status, formation, operator,
  producing_wells, permitted_wells,
  description, highlights, status
) values (
  'NW/4 Section 28 — Garfield County, OK',
  'Oklahoma', 'Garfield',
  'Lots One (1), Two (2), Five (5) and Six (6) also described as the Northwest Quarter (NW/4) of Section Twenty-eight (28), Township Twenty-four (24) North, Range Seven (7) West of the Indian Meridian',
  '24N', '7W', '28',
  'minerals', 160, 485000,
  '3/16ths', 'leased', 'STACK, Mississippian', 'SandRidge Energy',
  2, 1,
  'Prime STACK acreage in Garfield County, Oklahoma. Two producing horizontal wells with a third permitted. Leased at a favorable 3/16ths royalty rate. Clean title with no prior conveyances or depth severances.',
  ARRAY[
    'Two producing horizontal wells in the STACK formation',
    'One additional permitted well — upside potential',
    'Leased at 3/16ths royalty rate',
    'Clean title — no prior depth conveyances',
    'Core Garfield County acreage in proven STACK play'
  ],
  'active'
);
