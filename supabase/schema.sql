create table if not exists public.guests (
    id uuid primary key default gen_random_uuid(),
    passenger_name text not null,
    companions text[] not null default '{}',
    passenger_count int not null,
    created_at timestamptz not null default now()
);

alter table public.guests enable row level security;

create index if not exists guests_created_at_idx on public.guests (created_at desc);
