import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()

export class PeerNodes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nameNode: string;

    @Column()
    port: string;

    @Column()
    host: string;

    @Column()
    token: string;
}