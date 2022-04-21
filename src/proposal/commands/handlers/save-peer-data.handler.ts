import {
  CommandHandler,
  ICommandHandler
} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { savePearDataCommand } from '../impl/save-peer-data.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from '../../../db/entities/proposal.entity';
import { Repository } from 'typeorm';
@CommandHandler(savePearDataCommand)
export class savePeerDataHandler implements ICommandHandler<savePearDataCommand> {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
  ) { }

  async execute(command: savePearDataCommand) {
    console.log(clc.greenBright('savePearDataCommand...'));
    const { dataJson } = command;
    try {
      const newProposal = await this.proposalRepository.create({
        dataJson: dataJson,
      });
      await this.proposalRepository.save(newProposal);
      return newProposal;
    } catch (error) {
      return error
    }
  }
}
