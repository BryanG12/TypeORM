
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id:number
  
  @Column({nullable:false})
  firstName:string;
  
  @Column({nullable:false})
  lastName:string;

  @Column({unique:true})
  email:string;

  @Column({
    default: true
  })
  active:boolean;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAd:Date;
}