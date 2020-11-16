import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async getActive(id) {
    return await dbContext.Bugs.findById(id)
  }

  async deleteBug(bugId) {
    return await dbContext.Bugs.findByIdAndDelete(bugId)
  }

  async editBug(bugId, newBug) {
    const exist = await dbContext.Bugs.findById(bugId)
    if (!exist) {
      throw new BadRequest('this bug either does not exist or is closed')
    } else {
      await dbContext.Bugs.findByIdAndUpdate(bugId, newBug)
      return 'bug updated'
    }
  }
}

export const bugService = new BugService()
