import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ArticlesModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
