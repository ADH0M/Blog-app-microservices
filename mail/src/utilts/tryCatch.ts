import type { NextFunction, Request, RequestHandler, Response } from "express";

 const tryCatch = (hanldler: RequestHandler) => {
  return async (req:Request, res:Response , next:NextFunction) => {

    try {
        return hanldler(req, res,next)
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        });
    }
  };
};

export default tryCatch;