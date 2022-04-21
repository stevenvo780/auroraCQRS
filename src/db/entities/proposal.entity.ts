import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()

export class Proposal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    dataJson: string;

}