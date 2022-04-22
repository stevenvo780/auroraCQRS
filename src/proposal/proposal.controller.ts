import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { saveDataCommand } from './commands/impl/save-data.command';
import { savePearDataCommand } from './commands/impl/save-peer-data.command';
import { saveDataDto } from './interfaces/save-data-dto.interface';
import { GetProposalQuery } from './queries/impl';
import { ValidateSaveDataQuery } from './queries/impl';
import { Proposal } from '../db/entities/proposal.entity';
@Controller('proposal')
export class ProposalGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }
  // Commands
  @Post('/saveData')
  async saveData(@Body() dto: saveDataDto) {
    const resultSaveData = await this.commandBus.execute(new saveDataCommand(dto.dataJson));
    if (resultSaveData) {
      return this.commandBus.execute(new savePearDataCommand(dto.dataJson));
    }
    return resultSaveData
  }

  @Post('/savePearData')
  async validateData(@Body() dto: saveDataDto) {
    return this.commandBus.execute(new savePearDataCommand(dto.dataJson));
  }

  // Query
  @Get()
  async findAll(): Promise<Proposal[]> {
    return this.queryBus.execute(new GetProposalQuery());
  }

  @Post('/validateSaveData')
  async validateSaveData(@Body() dto: saveDataDto): Promise<Proposal[]> {
    return this.queryBus.execute(new ValidateSaveDataQuery(dto.dataJson));
  }
}
