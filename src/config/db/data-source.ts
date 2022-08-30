import { DataSource } from 'typeorm';
import ormConfig from '../../../ormconfig';

export const dataSource = new DataSource(ormConfig);
