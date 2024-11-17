import { NoteDm } from '../models/DMs/note.dm';
import { NoteDto } from '../models/DTOs/note.tdo';

export class NotesTransformer {
  static dtoToDm(dto: NoteDto): NoteDm {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      tags: dto.tags,
      userId: dto.userId,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
    };
  }

  static dmToDto(dm: NoteDm): NoteDto {
    return {
      id: dm.id,
      title: dm.title,
      content: dm.content,
      tags: dm.tags,
      userId: dm.userId,
    };
  }
}
