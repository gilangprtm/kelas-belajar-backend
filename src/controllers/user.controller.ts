import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { Public } from 'src/utility/public.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The user', type: User })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The created user id' })
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiResponse({ status: 202, description: 'The updated user id' })
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<number> {
    return this.userService.update(id, createUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The deleted user id' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }

  @Get('profile')
  @ApiResponse({ status: 200, description: 'User profile', type: [User] })
  async getProfile(): Promise<User[]> {
    return this.userService.getProfile();
  }
}
