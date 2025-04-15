import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const ensureDir = (dirPath) => {
    const fs = require('fs');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

const pdfDir = path.join(__dirname, '../../public/pdfs');
const zipDir = path.join(__dirname, '../../public/zips');

ensureDir(pdfDir);
ensureDir(zipDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, pdfDir); 
      } else if (file.mimetype === 'application/zip') {
        cb(null, zipDir); 
      } else {
        cb(new Error('Tipo de archivo no soportado'), false);
      }
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName); 
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/zip'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF y ZIP'), false);
    }
  };

  export const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, 
      files: 2 
    }
  });