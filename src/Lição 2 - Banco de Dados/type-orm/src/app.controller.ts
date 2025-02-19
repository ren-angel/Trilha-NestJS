import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './app.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Partial<User>) {

    return this.userService.create(data);
  }

  @Get()
  findAll() {

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<User>) {

    return this.userService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.userService.remove(+id);
  }
}