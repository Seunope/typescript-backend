export interface Reply {
  id: number,
  reply: string;
  userId: number;
  upVote: number;
  downVote: number;
  questionId: number;
}
