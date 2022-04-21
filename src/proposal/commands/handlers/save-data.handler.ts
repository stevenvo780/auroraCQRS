import {
  CommandHandler,
  ICommandHandler
} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { saveDataCommand } from '../impl/save-data.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PeerNodes } from '../../../db/entities/peerNodes.entity';
import { Repository } from 'typeorm';
import axios from 'axios';


@CommandHandler(saveDataCommand)
export class saveDataHandler implements ICommandHandler<saveDataCommand> {
  constructor(
    @InjectRepository(PeerNodes)
    private readonly peerNodesRepository: Repository<PeerNodes>,
  ) { }

  async execute(command: saveDataCommand) {
    const { dataJson } = command;
    let peersValid = 0;
    const peerNodes = await this.peerNodesRepository.find();
    for (let index = 0; index < peerNodes.length; index++) {
      const node = peerNodes[index];
      try {
        const { data } = await axios.post(
          `${node.host}:${node.port}/proposal/validateSaveData`,
          { dataJson: dataJson }
        );
        if (data) {
          peersValid++;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (peersValid === peerNodes.length) {
      for (let index = 0; index < peerNodes.length; index++) {
        const node = peerNodes[index];
        console.log(`${node.host}:${node.port}/proposal/savePearData`);
        try {
          const { data } = await axios.post(
            `${node.host}:${node.port}/proposal/savePearData`,
            { dataJson: dataJson }
          );
          if (data) {
            peersValid++;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    }
    console.log(clc.greenBright('Solicitud para guardar dato terminada...'));
  }
}
