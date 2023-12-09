import { IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty() @IsString() idToken: string;
  @IsNotEmpty() @IsString() id: string;
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() email: string;
  @IsNotEmpty() @IsString() photoUrl: string;
  @IsNotEmpty() @IsString() firstName: string;
  @IsNotEmpty() @IsString() lastName: string;
  @IsNotEmpty() @IsString() provider: string;
}
