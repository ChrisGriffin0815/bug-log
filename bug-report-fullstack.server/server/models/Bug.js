import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    reportedBy: { type: String, required: true },
    closed: { type: Boolean, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Profile', required: true }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Bug
