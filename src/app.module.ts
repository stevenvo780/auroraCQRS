import { Module } from '@nestjs/common';
import { ProposalGameModule } from './proposal/proposal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { Proposal } from './db/entities/proposal.entity';
import { PeerNodes } from './db/entities/peerNodes.entity';
@Module({
  imports: [
    ProposalGameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "127.0.0.1",
      port: 3306,
      username: "stevDB",
      password: "Htmlnod32",
      database: "cqrs",
      entities: [Proposal, PeerNodes],
      synchronize: true,
    })
  ],
})
export class ApplicationModule { }
