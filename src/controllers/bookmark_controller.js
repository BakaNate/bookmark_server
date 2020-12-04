import mongoose from 'mongoose';
import {
  sendOK, sendOKWithData, throwBadRequest, throwNotFound,
} from '../BakaDevKit/BakaRes';

const Bookmark = require('../models/bookmark_model');

const getAllBookmark = async (req, res) => {
  await Bookmark.getAllDocuments((err, bookmarks) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(bookmarks, res);
  });
};

const getOneBookmark = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return throwBadRequest(new Error('Wrong id format'), res);
  }
  await Bookmark.getDocumentById(req.params.id, (err, bookmark) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(bookmark);
  });
  return null;
};

const deleteBookmark = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return throwBadRequest(new Error('Wrong id format'), res);
  }
  await Bookmark.getDocumentById(req.params.id, (err, bookmark) => {
    if (err) return throwNotFound(err, res);
    bookmark.deleteDocument();
    return sendOK(res);
  });
  return null;
};

module.exports = {
  getAllBookmark,
  getOneBookmark,
  deleteBookmark,
};
