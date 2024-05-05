import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Manager } from './schemas/manager.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Manager.name)
    private managerModel: Model<Manager>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, mobile, roomNumber, month, email, password } = signUpDto;

    const hasPassword = await bcrypt.hash(password, 10);

    const manager = await this.managerModel.create({
      name,
      mobile,
      email,
      roomNumber,
      month,
      password: hasPassword,
    });

    const token = this.jwtService.sign({
      id: manager._id,
    });

    return { token };
  }
  async login(loginDto: loginDto): Promise<{ token: string }> {
    const { mobile, password } = loginDto;

    const manager = await this.managerModel.findOne({ mobile });

    if (!manager) {
      throw new UnauthorizedException('Invalid mobile or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, manager.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid mobile or password');
    }

    const token = this.jwtService.sign({ id: manager._id });

    return { token };
  }
}
