import { useMemo, useState } from 'react';
import type { CompatibilityNode } from '../types/compatibility';
import {
  buildCompatibilityGraph,
  findChosenNode,
  selectEssentialNodes,
  selectIsolatedNodes,
} from '../utils/compatibility';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';

export interface CompatibilityState {
  nodes: CompatibilityNode[];
  essentialNodes: CompatibilityNode[];
  isolatedNodes: CompatibilityNode[];
  chosenNode: CompatibilityNode | null;
  choosePiece: (pieceId: number) => void;
}

export function useCompatibility(): CompatibilityState {
  const { items } = useWardrobe();
  const nodes = useMemo(() => buildCompatibilityGraph(items), [items]);
  const [chosenPieceId, setChosenPieceId] = useState<number | null>(null);

  return {
    nodes,
    essentialNodes: selectEssentialNodes(nodes),
    isolatedNodes: selectIsolatedNodes(nodes),
    chosenNode: findChosenNode(nodes, chosenPieceId),
    choosePiece: setChosenPieceId,
  };
}
