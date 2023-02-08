import { Controller, Body, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {

    }

    @Post()
    addCat(
        @Body() createCatDto: CreateCatDto, 

    ) {
        const generatedId = this.catsService.insertCat(
            createCatDto.name, 
            createCatDto.age, 
            createCatDto.type
        );
        return { id: generatedId };  
    }

    @Get()
    getAllCats() {
        return this.catsService.getCats();
    }

    @Get(':id')
    getCat(@Param('id') catId: string) {
        console.log(catId);
        return this.catsService.getCat(catId);
    }

    @Patch(':id')
    updateCat(
        @Param('id') catId: string,
        @Body() createCatDto: CreateCatDto,
    ) {
        this.catsService.updateCat(catId, createCatDto.name, createCatDto.age, createCatDto.name);
        return null;
    }

    @Delete(':id')
    deleteCat(@Param('id') catId: string) {
        this.catsService.deleteCat(catId);
        return null;
    }

}