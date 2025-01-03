import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.categoriesArticle.create({
        data: createCategoryDto
      })

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Category with name: ${createCategoryDto.name} , already exists`)
        }
      }
    }
  }

  findAll() {
    return this.prisma.categoriesArticle.findMany();
  }

  findOne(id: string) {
    return this.prisma.categoriesArticle.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.categoriesArticle.update({
        data: updateCategoryDto,
        where: {
          id
        }
      })

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Category with name: ${updateCategoryDto.name} , already exists`)
        }
      }
    }
  }

  remove(id: string) {
    return this.prisma.categoriesArticle.delete({
      where:{
        id
      }
    })
  }
}
