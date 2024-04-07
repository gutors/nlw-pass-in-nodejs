/*
  Warnings:

  - You are about to drop the column `createdAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `events` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);
INSERT INTO "new_events" ("details", "id", "maximum_attendees", "slug", "title") SELECT "details", "id", "maximum_attendees", "slug", "title" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
