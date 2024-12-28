import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './app.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: { name: string; email: string }) {

    return this.userService.create(data);
  }

  @Get()
  findAll() {

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {

    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: { name?: string; email?: string }) {

    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {

    return this.userService.remove(id);
  }
}