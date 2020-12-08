import express from 'express';
import Ddos from 'ddos';

const bookmarkController = require('../controllers/bookmark_controller');

const router = express.Router();
if (process.env.NODE_ENV === 'PRODUCTION') {
  const ddos = new Ddos({ burst: 5, limit: 10 });
  router.use(ddos.express);
}
router.route('/')
  .get((req, res) => res.status(200).send('Wesh Morray'));

router.route('/bookmark/')
  .get(bookmarkController.getAllBookmark);

router.route('/bookmark/img/')
  .post(bookmarkController.createImgBookmark);

router.route('/bookmark/video/')
  .post(bookmarkController.createVideoBookmark);

router.route('/bookmark/:id')
  .get(bookmarkController.getOneBookmark)
  .put(bookmarkController.updateTag)
  .delete(bookmarkController.deleteBookmark);

module.exports = router;
