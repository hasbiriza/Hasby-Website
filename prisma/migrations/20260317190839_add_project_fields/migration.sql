-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "coverImage" TEXT,
    "techStack" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'shopify',
    "client" TEXT,
    "role" TEXT,
    "duration" TEXT,
    "highlights" TEXT,
    "liveUrl" TEXT,
    "repoUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("content", "coverImage", "createdAt", "description", "featured", "id", "liveUrl", "order", "repoUrl", "slug", "techStack", "title", "updatedAt") SELECT "content", "coverImage", "createdAt", "description", "featured", "id", "liveUrl", "order", "repoUrl", "slug", "techStack", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
