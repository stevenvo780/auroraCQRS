import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ValidateSaveDataQuery } from '../impl';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Proposal } from '../../../db/entities/proposal.entity';
//import { Repository } from 'typeorm';
@QueryHandler(ValidateSaveDataQuery)
export class ValidateSaveDataHandler implements IQueryHandler<ValidateSaveDataQuery> {
  constructor(
    //@InjectRepository(Proposal)
    //private proposalRepository: Repository<Proposal>
  ) { }

  async execute(query: ValidateSaveDataQuery) {
    console.log(query);
    console.log(clc.yellowBright('Async ValidateSaveDataQuery...'));
    if (query.dataJson) {
      return true;
    } else {
      return false;
    }
  }
}
