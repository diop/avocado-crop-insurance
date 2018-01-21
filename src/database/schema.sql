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
  email TEXT,
  paid BOOLEAN DEFAULT FALSE,
  creationdate DATE DEFAULT CURRENT_DATE
);
