DROP TABLE IF EXISTS farmers;
CREATE TABLE farmers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phonenumber TEXT,
  ethaddress TEXT,
  premium TEXT,
  technique TEXT,
  size TEXT,
  experience TEXT,
  region TEXT,
  elevation TEXT,
  longitude TEXT,
  latitude TEXT
);
