// src/mkelas/mkelas.service.ts

import { Inject, Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { KelasDto } from 'src/dto/kelas.dto';
import { Kelas } from 'src/entity/kelas.entity';
import { KelasPaginationQueryDto } from 'src/dto/pagination.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from 'src/utility/auth.service';

@Injectable()
export class KelasService {
  private readonly logger = new Logger(KelasService.name);
  private readonly DEFAULT_PAGE_SIZE = 10;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private authService: AuthService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createMKelasDto: KelasDto): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('mkelas')
        .insert(createMKelasDto)
        .select();
      if (error) {
        this.logger.error(`Error creating mKelas: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`mKelas created successfully with id ${data[0].id}`);
      return {
        id: data[0].id,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create mKelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to create mKelas: ' + error.message);
    }
  }

  async findAll(paginationQuery: KelasPaginationQueryDto): Promise<any> {
    const {
      pageIndex = 0,
      pageSize = this.DEFAULT_PAGE_SIZE,
      filter,
      spesifik,
    } = paginationQuery;

    const authHeader = this.request.headers.authorization;
    const user = await this.authService.validateToken(authHeader);
    const isSpesifik = spesifik.toString() === 'true' || spesifik === true;

    try {
      const query = this.supabaseService
        .getSupabase()
        .from('mkelas')
        .select('*, muser(*)', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);

      if (filter) {
        query.ilike('nama', `%${filter}%`);
      }

      if (isSpesifik) {
        query.eq('id_guru', user.id);
      }

      const { data, count, error } = await query;

      if (error) {
        this.logger.error(`Error fetching mKelas: ${error.message}`, error);
        throw new Error(error.message);
      }

      const kelasList: Kelas[] = data.map((data: any) => ({
        id: data.id,
        nama: data.nama,
        tahun: data.tahun,
        semester: data.semester,
        id_guru: data.id_guru,
        nama_guru: data.muser ? data.muser.nama : null,
      }));

      return {
        datas: kelasList,
        pageIndex,
        pageSize,
        totalCount: count,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch mKelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to fetch mKelas: ' + error.message);
    }
  }

  async findById(id: number): Promise<Kelas> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('mkelas')
        .select('*, muser(*)')
        .eq('id', id)
        .single();
      if (error) {
        this.logger.error(`Error fetching mKelas: ${error.message}`, error);
        throw new Error(error.message);
      }

      const kelas: Kelas = {
        id: data.id,
        nama: data.nama,
        tahun: data.tahun,
        semester: data.semester,
        id_guru: data.id_guru,
        nama_guru: data.muser ? data.muser.nama : null,
      };
      return kelas;
    } catch (error) {
      this.logger.error(
        `Failed to fetch mKelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to fetch mKelas: ' + error.message);
    }
  }

  async update(id: number, createMKelasDto: KelasDto): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabase()
        .from('mkelas')
        .update(createMKelasDto)
        .eq('id', id)
        .select();
      if (error) {
        this.logger.error(`Error updating mKelas: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`mKelas updated successfully with id ${data[0].id}`);
      return {
        id: data[0].id,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update mKelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to update mKelas: ' + error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const { error } = await this.supabaseService
        .getSupabase()
        .from('mkelas')
        .delete()
        .eq('id', id);
      if (error) {
        this.logger.error(`Error deleting kelas: ${error.message}`, error);
        throw new Error(error.message);
      }
      this.logger.log(`Kelas deleted successfully with id ${id}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete kelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to delete kelas: ' + error.message);
    }
  }
}
