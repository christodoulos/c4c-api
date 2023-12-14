import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly client: OAuth2Client,
  ) {}

  async verifyGoogleToken(token: string): Promise<{ access_token: string }> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const googlePayload = ticket.getPayload();
      const id = googlePayload.sub;

      let user = await this.userService.findOne(id);
      if (!user) {
        user = await this.userService.createGoogleUser(googlePayload);
      } else {
        user = await this.userService.updateGoogleUser(googlePayload);
      }
      // Generate JWT
      const payload = {
        user: {
          loggedIn: true,
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.photoUrl,
          category: user.category,
          institution: user.institution,
          linkedin: user.linkedin,
          provider: user.provider,
        },
      };
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    } catch (error) {
      throw new Error('Invalid Google token.');
    }
  }
}
