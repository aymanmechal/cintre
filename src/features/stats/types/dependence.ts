import type { DependenceLevel } from '../constants/dependence';
import type { PieceStat } from './stats';

export interface Dependence {
  level: DependenceLevel;
  topShare: number;
  topPieces: PieceStat[];
}
