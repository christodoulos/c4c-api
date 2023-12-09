import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createGoogleUser(tokenPayload: TokenPayload): Promise<User> {
    const { sub, name, email, given_name, family_name, picture } = tokenPayload;
    const newUser = new this.userModel({
      id: sub,
      name,
      email,
      firstName: given_name,
      lastName: family_name,
      photoUrl: picture,
    });
    return newUser.save();
  }

  async updateGoogleUser(tokenPayload: TokenPayload): Promise<User> {
    const { sub, name, email, given_name, family_name, picture } = tokenPayload;
    const user = await this.userModel.findOne({ id: sub });
    user.name = name;
    user.email = email;
    user.firstName = given_name;
    user.lastName = family_name;
    user.photoUrl = picture;
    return user.save();
  }

  async findOne(id: string): Promise<User | undefined> {
    console.log('FINDING ONE', id);
    return this.userModel.findOne({ id }).exec();
  }
}
