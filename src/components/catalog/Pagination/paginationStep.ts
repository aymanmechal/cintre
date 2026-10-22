export enum PaginationStep {
  Previous = 'previous',
  Next = 'next',
}

export const PAGINATION_STEP_LABELS: Record<PaginationStep, string> = {
  [PaginationStep.Previous]: 'Précédent',
  [PaginationStep.Next]: 'Suivant',
};

export const PAGINATION_STEP_ICONS: Record<PaginationStep, string> = {
  [PaginationStep.Previous]: '←',
  [PaginationStep.Next]: '→',
};
