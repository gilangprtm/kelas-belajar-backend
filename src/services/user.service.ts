import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from 'src/utility/auth.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private authService: AuthService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .select('*');
      if (error) {
        this.logger.error(`Error fetching users: ${error.message}`, error);
        throw new Error(error.message);
      }
      return data as User[];
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`, error.stack);
      throw new Error('Failed to get users: ' + error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    const authHeader = this.request.headers.authorization;
    const user = await this.authService.validateToken(authHeader);
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        this.logger.error(
          `Error fetching user with id ${id}: ${error.message}`,
          error,
        );
        throw new Error(error.message);
      }
      return data as User;
    } catch (error) {
      this.logger.error(
        `Failed to get user by id: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to get user by id: ' + error.message);
    }
  }

  async create(userData: CreateUserDto): Promise<number> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .insert(userData)
        .select();
      if (error) {
        this.logger.error(`Error creating user: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`User created successfully with id ${data[0].id}`);
      return data[0].id;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  async update(id: number, userData: CreateUserDto): Promise<number> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .update(userData)
        .eq('id', id)
        .select();
      if (error) {
        this.logger.error(`Error updating user: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`User updated successfully with id ${data[0].id}`);
      return data[0].id;
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const { error } = await this.supabaseService
        .getSupabase()
        .from('muser')
        .delete()
        .eq('id', id);
      if (error) {
        this.logger.error(`Error deleting user: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`User deleted successfully with id ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete user: ${error.message}`, error.stack);
      throw new Error('Failed to delete user: ' + error.message);
    }
  }

  async getProfile(): Promise<User> {
    const authHeader = this.request.headers.authorization;
    const user = await this.authService.validateToken(authHeader);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('User not found');
    }

    return user as User;
  }
}
