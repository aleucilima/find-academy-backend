import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Academy from './Academy'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Academy, academy => academy.images)
    @JoinColumn({ name: 'academy_id'})
    academy: Academy;
}