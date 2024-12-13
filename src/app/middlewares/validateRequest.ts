import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utility/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation check
    // if everything all right next() ->

    await schema.parseAsync({
      body: req.body,
    });
    next();
  })
};

export default validateRequest;
