import {
  sendOK, throwNotFound,
} from '../BakaDevKit/BakaRes';

const Bookmark = require('../models/bookmark_model');

const deleteBookmark = async (req, res) => {
  await Bookmark.getDocumentById(req.params.id, (err, bookmark) => {
    if (err) return throwNotFound(err, res);
    bookmark.deleteDocument();
    return sendOK(res);
  });
};

module.exports = {
  deleteBookmark,
};
