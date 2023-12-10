import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/app.metadata';

@ApiTags('Authentication Management')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('google-login')
  async googleLogin(@Body('idToken') idToken: string) {
    try {
      const access_token = (await this.authService.verifyGoogleToken(idToken))
        .access_token;
      return { access_token };
    } catch (error) {
      return { error: error.message };
    }
  }
}
