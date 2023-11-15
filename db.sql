
CREATE DATABASE assignment;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE categories CASCADE;

CREATE TABLE categories (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE products (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL UNIQUE,
  price BIGINT NOT NULL DEFAULT 0,
  available BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  image_url VARCHAR(255) NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- ASSUMPTION: Should be one product details to a product

CREATE TABLE product_details (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  info TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE users (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cart (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE cart_items (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE(cart_id, product_id)
);

CREATE TABLE orders (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number BIGSERIAL NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Important to keep the amount to pay from the product price increase the product price changes in the future
CREATE TABLE order_items (
	id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  amount_to_pay BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
