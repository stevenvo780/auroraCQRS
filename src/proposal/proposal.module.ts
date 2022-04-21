import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { ProposalGameController } from './proposal.controller';
import { QueryHandlers } from './queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../db/entities/proposal.entity';
import { PeerNodes } from '../db/entities/peerNodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal, PeerNodes]), CqrsModule],
  controllers: [ProposalGameController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ProposalGameModule {}
