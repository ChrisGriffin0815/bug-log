import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:bugId', this.getActive)
      .post('', this.create)
      .put('/:bugId', this.editBug)
      .get('/:bugId/notes', this.getNotes)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.name
      req.body.creatorEmail = req.userInfo.email
      res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      res.send(await noteService.getNotesByBug(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async getActive(req, res, next) {
    try {
      res.send(await bugService.getActive(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      res.send(await bugService.deleteBug(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      res.send(await bugService.editBug(req.params.bugId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    res.send(noteService.deleteNote)
  }
}
