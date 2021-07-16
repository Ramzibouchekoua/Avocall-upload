import path from 'path';
import multer from 'multer';
import fs from 'fs';
import appRootPath from 'app-root-path';
import _ from 'lodash';
import File from '../models/file'


let pathToUploads = `${appRootPath}/uploads/`;
const uploadFile = (req, res, next) => {

  let files = [];
  let resultFile;
  let originalName = '';
  let extension = '';
  let size = 0;
  let uploadedFile;
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathToUploads);
    },
    filename: (req, file, cb) => {
      originalName = String(Math.floor(Math.random() * (999 - 100) + 100)) + file.originalname;
      extension = path.extname(file.originalname);
      size = file.size || 1;

      uploadedFile = new File({
        fileName: originalName,
        originalName,
        fileExtension: extension,
        fileSize: size,
        user: req.user,
      });

      uploadedFile.save((err, file) => {
        if (err) return next(err);
        files.push(file.id);
        cb(err, originalName);
        resultFile = file;
      });
    }, //,
    fileSize: 5000000,
  });

  let upload = multer({ storage }).array('file', 10);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.json({
        success: false,
        error: err,
      });
    } else if (err) {
      console.log(err);

      return next(err);
    }
    if (!resultFile)
      return res.status(400).json({
        success: false,
        responseCode: 'file is required',
      });

    return res.status(200).json({
      success: true,
      responseCode: 'upload success',
      data: resultFile,
    });
  });
};

const getFile = (req, res, next) => {

  let _id = req.params.id;
  File.findOne(
    {
      _id,
    },
    (err, file) => {
      if (err) return next(err);
      if (file === null) return;
      if (!file || !fs.existsSync(path.join(pathToUploads, file.originalName))) {
        console.log(`${pathToUploads}${file.originalName} NOT_FOUND`);
        res.status(404).json({
          success: false,
          responseCode: 'file not found',
        });
      } else {
        // return res.download(path.join(pathToUploads, file.originalName));
        return res.send(path.join(pathToUploads, file.originalName));
      }
    }
  );
};

export default { uploadFile, getFile };
