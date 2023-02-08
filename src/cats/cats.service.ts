import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cat.model';

@Injectable()
export class CatsService {
    private cats: Cat[] = [];

    insertCat(name: string, age: number, type: string) {
        // const catId = new Date().toString();
        const catId = Math.random().toString();
        const newCat = new Cat(catId, name, age, type);
        this.cats.push(newCat);
        return catId;
    }

    getCats() {
        return [...this.cats];
    }

    getCat(catId: string) {
        const cat = this.findCat(catId);
        console.log(cat);
        console.log({ ...cat });
        return { ...cat };
    }

    updateCat(catId: string, catName: string, catAge: number, catType: string) {
        const [cat, index] = this.findCat(catId);
        const updatedCat = {...cat};

        if (catName) {
            updatedCat.name = catName;
        }
        if (catAge) {
            updatedCat.age = catAge;
        }
        if (catType) {
            updatedCat.type = catType;
        }
        console.log('updated_cat : ', updatedCat);
        this.cats[index] = updatedCat;
        console.log('cats : ', this.cats);
        return this.cats;
    }

    private findCat(catId: string): [Cat, number] {
        const catIndex = this.cats.findIndex((cat) => cat.id === catId);
        console.log('catIndex: ', catIndex);
        const cat = this.cats[catIndex];
        if (!cat) {
            throw new NotFoundException('Could not find product!');
        }
        return [cat, catIndex];
    }

    deleteCat(catId: string) {
        const catIndex = this.findCat(catId)[1];
        this.cats.splice(catIndex, 1);
    }
}