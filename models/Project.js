import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  shortDescription: {
    type: String,
    required: false
  },
  mainImage: {
    type: String,
    required: false
  },
  detailImages: {
    type: [String],
    default: []
  },
  liveLink: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  projectNumber: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

delete mongoose.models.Project;
const Project = mongoose.model('Project', projectSchema);

export default Project;
