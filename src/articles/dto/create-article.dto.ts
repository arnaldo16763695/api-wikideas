import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    contentHtml:string;

    @IsString()
    @IsNotEmpty()
    contentText: string;
}