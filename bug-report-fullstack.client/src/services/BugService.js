import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'

class BugService {
  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      this.getAllBugs()
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBug(id) {
    try {
      this.getNotes(id)
      const res = await api.get('api/bugs/' + id)
      logger.log(res.data)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(newComment) {
    try {
      newComment.creator = AppState.profile
      const res = await api.post('api/notes', newComment)
      this.getNotes(newComment.bugId)
      logger.log(res)
    } catch (error) {
      logger.log(error)
    }
  }

  async getNotes(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
      logger.log(AppState.notes)
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteNote(noteId, bugId) {
    try {
      const res = await api.delete('api/notes/' + noteId)
      logger.log(res)
      this.getNotes(bugId)
    } catch (error) {
      logger.log(error)
    }
  }

  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      logger.log(res)
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBug(id) {
    try {
      const res = await api.delete('api/bugs/' + id)
      logger.log(res)
      this.getAllBugs()
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(id, editBug) {
    try {
      const res = await api.put('api/bugs/' + id, editBug)
      logger.log(res.data)
      this.getActiveBug(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async closeBug(id, closedBug) {
    try {
      if (window.confirm('Are you sure? This action can not be undone.')) {
        const res = await api.put('api/bugs/' + id, closedBug)
        this.getActiveBug(id)
        logger.log(res)
      }
    } catch (error) {
      logger.log(error)
    }
  }
}

export const bugService = new BugService()
