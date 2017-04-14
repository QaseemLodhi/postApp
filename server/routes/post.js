import { Router } from 'express';
import * as PostController from '../controllers/post';
const router = new Router();

router.route('/post').get(PostController.getPosts);
router.route('/post/:id').get(PostController.getPost);
router.route('/post').post(PostController.addPost);
router.route('/post/:id').delete(PostController.deletePost);

export default router;
