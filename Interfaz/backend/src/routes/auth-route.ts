import { Router } from 'express';
import {searchByWord, getWordTotalCount, getWordContTag_page, getWordTag_page} from '../controllers/auth-controller'

const router = Router();
router.get('/searchByWord', searchByWord);
router.get('/get-word-total-count', getWordTotalCount);
router.get('/get-wordContTag', getWordContTag_page);
router.get('/get-wordTag', getWordTag_page)

export default router;