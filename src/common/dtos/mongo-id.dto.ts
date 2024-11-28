import { IsMongoId } from 'class-validator';

export class MongoIdPathParamDto {
  @IsMongoId()
  id: string;
}
