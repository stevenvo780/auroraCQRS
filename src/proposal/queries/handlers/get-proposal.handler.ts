import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetProposalQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from '../../../db/entities/proposal.entity';
import { Repository } from 'typeorm';
@QueryHandler(GetProposalQuery)
export class GetProposalHandler implements IQueryHandler<GetProposalQuery> {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>
  ) { }

  async execute(query: GetProposalQuery) {
    console.log(clc.yellowBright('Async GetProposalQuery...'));
    return this.proposalRepository.find();
  }
}
