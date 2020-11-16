import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async getAll(query = {}) {
    return await dbContext.Notes.find(query)
  }

  async getNotesByBug(bugId) {
    return await dbContext.Notes.find({bugId})
  }

  async deleteNote(noteId) {
    return await dbContext.Notes.findByIdAndDelete(noteId)
  }

  async editNote(noteId, newNote) {
    const exist = await dbContext.Notes.findById(noteId)
    if (!exist) {
      throw new BadRequest('this note either does not exist or is closed')
    } else {
      await dbContext.Notes.findByIdAndUpdate(noteId, newNote)
      return 'note updated'
    }
  }
}

export const noteService = new NoteService()
