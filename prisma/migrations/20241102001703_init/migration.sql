-- CreateTable
CREATE TABLE "Articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contentHtml" TEXT NOT NULL,
    "contentText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,
    "categoriesArticleId" TEXT,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesArticle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CategoriesArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_categoriesArticleId_fkey" FOREIGN KEY ("categoriesArticleId") REFERENCES "CategoriesArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
