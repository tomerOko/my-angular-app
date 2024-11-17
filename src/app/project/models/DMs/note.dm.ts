export interface NoteDm {
  id?: string;
  title: string;
  content: string;
  tags?: string[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
