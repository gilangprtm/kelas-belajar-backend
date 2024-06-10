// src/mkelas/mkelas.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { KelasDto } from 'src/dto/kelas.dto';
import { Kelas } from 'src/entity/kelas.entity';

@Injectable()
export class KelasService {
  private readonly logger = new Logger(KelasService.name);
  private readonly DEFAULT_PAGE_SIZE = 10;

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createMKelasDto: KelasDto): Promise<number> {
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
      return data[0].id;
    } catch (error) {
      this.logger.error(
        `Failed to create mKelas: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to create mKelas: ' + error.message);
    }
  }

  async findAll(
    pageIndex: number = 0,
    pageSize: number = this.DEFAULT_PAGE_SIZE,
  ): Promise<any> {
    try {
      const { data, count, error } = await this.supabaseService
        .getSupabase()
        .from('mkelas')
        .select('*, muser(*)', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);

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

  async update(id: number, createMKelasDto: KelasDto): Promise<number> {
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
      return data[0].id;
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
