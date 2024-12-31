import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {

  @Get()
  @UseGuards(JwtAuthGuard) // Aplica o guard JWT para a rota
  getAllUsers() {
    return [{ id: 1, username: 'John Doe' }];
  }
}