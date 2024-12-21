/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Articles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CategoriesArticle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Articles_title_key" ON "Articles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesArticle_name_key" ON "CategoriesArticle"("name");
