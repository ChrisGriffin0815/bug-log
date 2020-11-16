import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .delete('/:noteId', this.deleteNote)
      .post('', this.create)
      .put('/:noteId', this.editNote)
      // .get('/:bugId/notes', this.getNotes)
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      req.body.reportedBy = req.userInfo.name
      res.send(await noteService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await noteService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      res.send(await noteService.getNotesByBug(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      res.send(await noteService.deleteNote(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      res.send(await noteService.editNote(req.params.noteId, req.body))
    } catch (error) {
      next(error)
    }
  }
}
