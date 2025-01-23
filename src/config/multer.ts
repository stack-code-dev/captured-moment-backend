import { FastifyRequest } from "fastify";
import multer from "fastify-multer";
import { File, FileFilterCallback } from "fastify-multer/lib/interfaces";
import path from 'path'

const storage = multer.diskStorage({
  // definir o diretorio
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

const fileFilter = (req: FastifyRequest, file: File, cb: FileFilterCallback) => {
  if(file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only images are allwed"), false)
  }
}

export const upload = multer({ storage, fileFilter })
