import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const data = await this.authService.signUp(signUpDto);
      return {
        data,
        message: 'Signup successful',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'Signup failed',
      };
    }
  }

  @Post('/login')
  async login(@Body() loginDto: loginDto) {
    try {
      const data = await this.authService.login(loginDto);
      return {
        data,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'Login failed',
      };
    }
  }
}
