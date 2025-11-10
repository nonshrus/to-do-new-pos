import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserXunEntity } from './entities/xun.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    // @InjectRepository(UserXunEntity)
    // private userXunRepository: Repository<UserXunEntity>,
  ) {}

  // async validateUser(username: string, pass: string) {
  //   const user = await this.usersService.findByUsername(username);
  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  login(user: { username: string; id: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      status: 200,
      message: 'Login success',
      data: {
        access_token: this.jwtService.sign(payload),
        user,
      },
      error: null,
    };
  }
  // async findByUsername(username: string) {}
}
