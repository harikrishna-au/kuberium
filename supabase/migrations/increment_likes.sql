create or replace function increment_likes()
returns bigint
language sql
as $$
  select coalesce(likes, 0) + 1
$$;