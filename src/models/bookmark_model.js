import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    maxlength: 254,
  },
  title: {
    type: String,
    required: true,
    maxlength: 254,
  },
  author: {
    type: String,
    required: true,
    maxlength: 254,
  },
  date: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  tags: {
    type: [String],
    maxlength: 254,
  },
  type: {
    type: String,
    maxlength: 254,
    required: true,
  },
});

bookmarkSchema.statics.getAllDocuments = async function (cb) {
  await this.model('Bookmark').find({}, async (err, bookmarks) => {
    if (err) return cb(err);
    if (!bookmarks) return cb(new Error('No bookmarks found'));
    return cb(null, bookmarks);
  });
};

bookmarkSchema.statics.getDocumentById = async function (_id, cb) {
  await this.findOne({ _id }, async (err, bookmark) => {
    if (err) return cb(err);
    if (!bookmark) return cb(new Error('Bookmark Not found'));
    return cb(null, bookmark);
  });
};

bookmarkSchema.statics.createRecords = async function (url, title, author, height,
  width, duration, tags, type, cb) {
  if (!url || !title || !author || !height || !width || !type) {
    return cb(new Error('Missing Parameters'));
  }
  await this.model('Bookmark').create({
    url,
    title,
    author,
    date: Date.now(),
    height,
    width,
    duration,
    tags,
    type,
  }, (err, record) => {
    if (err) return cb(err);
    return cb(null, record);
  });
  return null;
};

bookmarkSchema.methods.updateTags = async function (tags) {
  this.tags = tags;
  this.save();
};

bookmarkSchema.methods.deleteDocument = async function () {
  await this.delete();
  return null;
};

module.exports = mongoose.model('Bookmark', bookmarkSchema);
