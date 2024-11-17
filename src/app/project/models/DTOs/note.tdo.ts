export interface NoteDto {
  id?: string;
  title: string;
  content: string;
  tags?: string[];
  userId?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
