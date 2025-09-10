export type CommentItem = {
  id: string;
  timestamp: number;
  createdAt: string;
  text?: string;
  paths?: {color?: string; points: {x: number; y: number}[]}[];
  imageUri?: string;
};
