export interface Rating {
  id: number;
  type: string;
  userId: number;
  modelId: number;
  upVote: boolean;
  downVote: boolean;
}
