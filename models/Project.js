import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  detailImages: {
    type: [String],
    default: []
  },
  liveLink: {
    type: String
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
