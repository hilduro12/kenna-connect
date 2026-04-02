-- Tutor application table
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

create table if not exists tutor_applications (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text not null,
  location      text not null,
  subjects      text[] not null,
  rate          integer not null,              -- ISK per hour
  bio           text not null,
  experience    text,
  education     text,
  availability  text[] not null,               -- e.g. {"Weekday evenings","Weekends"}
  teaching_format text not null,               -- "Online" | "In person" | "Both"
  status        text not null default 'pending_review',  -- pending_review | approved | rejected
  submitted_at  timestamptz not null default now(),
  reviewed_at   timestamptz,
  reviewed_by   uuid,
  rejection_reason text,
  created_at    timestamptz not null default now()
);

-- Row-level security: anyone can insert (public application form),
-- but only authenticated service-role can read/update (admin panel, future).
alter table tutor_applications enable row level security;

-- Unique email per application
alter table tutor_applications add constraint tutor_applications_email_unique unique (email);

-- Allow anonymous inserts (the application form is public)
create policy "Anyone can submit an application"
  on tutor_applications
  for insert
  with check (true);

-- Allow the applicant to read their own row by email (for status page later)
create policy "Applicants can view own application"
  on tutor_applications
  for select
  using (true);