import mongoose from 'mongoose';
import axios from 'axios';
import {
  sendCreated,
  sendOK, sendOKWithData, throwBadRequest, throwIntServerError, throwNotFound,
} from '../BakaDevKit/BakaRes';
import Utils from '../Tools/utils';

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

const createImgBookmark = async (req, res) => {
  if (!req.body.url) return throwBadRequest(new Error('Missing parameter'), res);
  const oembedUrl = `https://www.flickr.com/services/oembed.json?url=${Utils.formatString(req.body.url)}`;

  await axios.get(oembedUrl).then(async (r) => {
    await Bookmark.createRecords(
      req.body.url,
      r.data.title,
      r.data.author_name,
      r.data.height,
      r.data.width,
      null,
      req.body.tags,
      r.data.type,
      (err, record) => {
        if (err) return throwIntServerError(err, res);
        return sendCreated(record, res);
      },
    );
  }).catch((e) => throwIntServerError(e, res));
  return null;
};

const createVideoBookmark = async (req, res) => {
  if (!req.body.url) return throwBadRequest(new Error('Missing parameter'), res);
  const oembedUrl = `https://vimeo.com/api/oembed.json?url=${Utils.formatString(req.body.url)}`;

  await axios.get(oembedUrl).then(async (r) => {
    await Bookmark.createRecords(
      req.body.url,
      r.data.title,
      r.data.author_name,
      r.data.height,
      r.data.width,
      r.data.duration,
      req.body.tags,
      r.data.type,
      (err, record) => {
        if (err) return throwIntServerError(err, res);
        return sendCreated(record, res);
      },
    );
  }).catch((e) => throwIntServerError(e, res));
  return null;
};

const updateTag = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return throwBadRequest(new Error('Wrong id format'), res);
  }
  if (!req.body.tags) return throwBadRequest(new Error('Missing parameters'), res);
  await Bookmark.getDocumentById(req.params.id, (err, bookmark) => {
    if (err) return throwNotFound(err, res);
    bookmark.updateTags(req.body.tags);
    return sendOK(res);
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
  createImgBookmark,
  createVideoBookmark,
  updateTag,
  getOneBookmark,
  deleteBookmark,
};
