import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('apikeys')
class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column()
  client: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default ApiKey;
