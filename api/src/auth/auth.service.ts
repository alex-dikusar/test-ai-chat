import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

const SALT_ROUNDS = 10;

/** User row including password (for validateUser result when Prisma types omit it). */
type UserWithPassword = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hash, name: dto.name } as never,
      select: { id: true, email: true, name: true, createdAt: true },
    });
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user, token };
  }

  async validateUser(email: string, password: string) {
    const user = (await this.prisma.user.findUnique({
      where: { email },
    })) as UserWithPassword | null;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.issueToken(user);
  }

  /** Issue JWT for an already-validated user (e.g. from LocalStrategy). */
  issueToken(user: { id: string; email: string; name: string | null }) {
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  }
}
