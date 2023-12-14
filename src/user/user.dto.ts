import { IsString } from 'class-validator';

export class UserDTO {
  @IsString() id?: string;
  @IsString() email?: string;
  @IsString() name?: string;
  @IsString() firstName?: string;
  @IsString() lastName?: string;
  @IsString() photoUrl?: string;
  @IsString() category?: string;
  @IsString() institution?: string;
  @IsString() linkedin?: string;
  @IsString() provider: string;
}
