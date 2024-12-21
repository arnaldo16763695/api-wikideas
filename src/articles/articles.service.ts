import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }


  async create(createArticleDto: CreateArticleDto) {
    try {
      return await this.prisma.articles.create({
        data: createArticleDto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Article with title: ${createArticleDto.title} , already exists`)
        }
      }
    }
  }

  findAll() {
    return this.prisma.articles.findMany({
      where: {
        deletedAt: false
      },
      include: {
        CategoriesArticle: true
      }
    });
  }

  findArticlesByCategory(id: string) {
    return this.prisma.articles.findMany({
      where: {
        deletedAt: false,
        categoriesArticleId: id
      },
      include: {
        CategoriesArticle: true
      }
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id,
        deletedAt: false
      },
      include: {
        CategoriesArticle: true
      }
    });
    if (!article) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return article
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id,
        deletedAt: false
      }
    })

    if (!article) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    try {
      return await this.prisma.articles.update({
        where: {
          id,
          deletedAt: false
        },
        data: updateArticleDto
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with title: ${updateArticleDto.title} , already exists`)
        }
      }
    }
  }

  async remove(id: string) {
    const article = await this.prisma.articles.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Product with id ${id} not found`)

    }
    return this.prisma.articles.update({
      where: { id },
      data: {
        deletedAt: true
      }
    });
  }
}
