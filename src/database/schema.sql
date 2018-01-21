DROP TABLE IF EXISTS farmers;
CREATE TABLE farmers (
  id SERIAL PRIMARY KEY,
  region TEXT,
  name TEXT,
  phone_number TEXT,
  ethereum_address TEXT,
  premium INT
);
