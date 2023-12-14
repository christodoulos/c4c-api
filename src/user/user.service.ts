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
    return await user.save();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ id }).lean();
  }

  async register(user: Partial<User>): Promise<User> {
    console.log(user);
    return await this.userModel
      .findOneAndUpdate({ id: user.id }, user, {
        returnOriginal: false,
        upsert: true,
      })
      .select('-_id -__v')
      .lean();
  }
}
