import { Router } from 'express';
import {searchByWord, getWordTotalCount, getWordContTag_page, getWordTag_page, getWordPercentageInPage, getTopTagsWithMostDistinctWords, getTopTagsWithMostText, findPageByUrl} from '../controllers/auth-controller'

const router = Router();
router.get('/searchByWord', searchByWord);
router.get('/get-word-total-count', getWordTotalCount);
router.get('/get-wordContTag', getWordContTag_page);
router.get('/get-wordTag', getWordTag_page)

router.get('/word-percentage', getWordPercentageInPage);
router.get('/top-tags-distinct-words', getTopTagsWithMostDistinctWords);
router.get('/top-tags-text-count', getTopTagsWithMostText);
router.get('/find-page-by-url', findPageByUrl);

export default router;