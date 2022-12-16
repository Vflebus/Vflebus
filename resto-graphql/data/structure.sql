-- Deploy o-resto:init to pg
BEGIN;

DROP TABLE IF EXISTS "manager", "cooking_style", "city", "restaurant", "restaurant_has_cooking_style";


CREATE TABLE "manager" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "cooking_style" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "city" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "postal_code" TEXT NOT NULL,
    "geopos" FLOAT[] NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "restaurant" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "terrace" BOOLEAN NOT NULL DEFAULT FALSE,
    "manager_id" INT NOT NULL REFERENCES "manager" ("id") ON DELETE CASCADE,
    "city_id" INT NOT NULL REFERENCES "city" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "restaurant_has_cooking_style" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "restaurant_id" INT NOT NULL REFERENCES "restaurant" ("id") ON DELETE CASCADE,
    "cooking_style_id" INT NOT NULL REFERENCES "cooking_style" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    UNIQUE ("restaurant_id", "cooking_style_id")
);

/****************************************************************************************
 * ARCHIVE
 ****************************************************************************************/

DROP TABLE IF EXISTS "archive_manager", "archive_cooking_style", "archive_city", "archive_restaurant", "archive_restaurant_has_cooking_style";

CREATE TABLE "archive_manager" (
    "id" INT PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "archived_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "archive_cooking_style" (
    "id" INT PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "archived_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "archive_city" (
    "id" INT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "geopos" FLOAT[] NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "archived_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "archive_restaurant" (
    "id" INT  PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "terrace" BOOLEAN NOT NULL DEFAULT FALSE,
    "manager_id" INT NOT NULL,
    "city_id" INT NOT NULL ,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "archived_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "archive_restaurant_has_cooking_style" (
    "id" INT PRIMARY KEY,
    "restaurant_id" INT NOT NULL,
    "cooking_style_id" INT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "archived_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
