import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from '../entities/proposal.entity';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
  ) {}

  findAll(): Promise<Proposal[]> {
    return this.proposalRepository.find();
  }

  findOne(id: string): Promise<Proposal> {
    return this.proposalRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.proposalRepository.delete(id);
  }
}