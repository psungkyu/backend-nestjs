import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
    @ApiProperty({ description: '이름' })
    name: string;

    @ApiProperty({ description: '나이' })
    age: number;

    @ApiProperty({ description: '종류' })
    type: string;
  }