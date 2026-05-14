import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';
import { v2 as cloudinary } from 'cloudinary';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any,
) => {
  if (!/\/(jpg|jpeg|png|gif|webp)$/.test(file.mimetype)) {
    return cb(new BadRequestException('Only image files are allowed'), false);
  }
  cb(null, true);
};

export const imageLimits = { fileSize: 5 * 1024 * 1024 };

/** Multer хранит файл в памяти — буфер передаётся в uploadToCloudinary. */
export const memStorage = memoryStorage();

/** Загружает буфер файла в указанную папку Cloudinary, возвращает secure_url. */
export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<string> =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error || !result) return reject(error ?? new Error('Upload failed'));
        resolve(result.secure_url);
      })
      .end(buffer);
  });

/** Извлекает Cloudinary public_id из URL для последующего удаления. */
export const extractPublicId = (url: string | null): string | null => {
  if (!url?.startsWith('http')) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match?.[1] ?? null;
};
