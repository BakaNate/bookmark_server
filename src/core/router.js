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

router.route('/bookmark/:id')
  .delete(bookmarkController.deleteBookmark);

module.exports = router;
