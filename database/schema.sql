CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  phone_code VARCHAR(8) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS services (
  code VARCHAR(16) PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS redirect_events (
  id BIGSERIAL PRIMARY KEY,
  medium VARCHAR(40) NOT NULL,
  locale VARCHAR(2),
  referer TEXT,
  ip_hash VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS redirect_events_created_idx ON redirect_events(created_at DESC);
CREATE INDEX IF NOT EXISTS redirect_events_medium_idx ON redirect_events(medium);
