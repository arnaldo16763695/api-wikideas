import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateArticleDto{
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