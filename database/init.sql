CREATE USER normal_user WITH PASSWORD 'normal_password';

CREATE TABLE "room_types" (
  "id" SERIAL PRIMARY KEY,
  "hotel_id" INTEGER NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "price" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "rooms" (
  "id" SERIAL PRIMARY KEY,
  "hotel_id" INTEGER NOT NULL,
  "room_type_id" INTEGER NOT NULL,
  "number" VARCHAR(10) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'available'
);

CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "status" VARCHAR(20) NOT NULL
);

CREATE TABLE "ratings" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "hotel_id" INTEGER NOT NULL,
  "rating_value" INTEGER NOT NULL,
  "review" TEXT,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "hotels" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "city" VARCHAR(100) NOT NULL,
  "country" VARCHAR(100) NOT NULL,
  "stars" INTEGER NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "hotel_id" INTEGER NOT NULL,
  "check_in_date" DATE NOT NULL,
  "check_out_date" DATE NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "managers" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "hotel_id" INTEGER NOT NULL
);

CREATE UNIQUE INDEX "unique_user_hotel" ON "managers" ("user_id", "hotel_id");

ALTER TABLE "room_types" ADD FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("room_type_id") REFERENCES "room_types" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "managers" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "managers" ADD FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id");
