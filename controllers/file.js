import uploadFileService from '../services/uploadFile';
import asyncHandler from 'express-async-handler';

export const uploadFile = asyncHandler(async (req, res, next) => uploadFileService.uploadFile(req, res, next));
export const getFile = asyncHandler(async (req, res, next) => uploadFileService.getFile(req, res, next));