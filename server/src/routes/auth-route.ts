import { Router, Request, Response } from 'express';
import asyncHandler from '../utils/async-error-handler';
import { fetchSearchResults } from '../services/auth-service';

const searchRouter = Router();

searchRouter.get(
    '/weather',
    asyncHandler(async (req: Request, res: Response) => {
        const fetchResult = await fetchSearchResults();
        res.status(200).json(fetchResult);
    })
);

export default searchRouter;
