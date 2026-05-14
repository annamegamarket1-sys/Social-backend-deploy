import { BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

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

/** Загружает все файлы в одну папку Cloudinary (например, 'posts'). */
export const singleFolderStorage = (folder: string) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'image',
    } as object,
  });

/**
 * Загружает файлы в разные папки в зависимости от имени поля.
 * Пример: { avatar: 'avatars', coverImage: 'covers' }
 */
export const fieldFolderStorage = (mapping: Record<string, string>) =>
  new CloudinaryStorage({
    cloudinary,
    params: (req: any, file: Express.Multer.File) => ({
      folder: mapping[file.fieldname] ?? 'uploads',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'image',
    }),
  });

/** Извлекает Cloudinary public_id из URL для последующего удаления. */
export const extractPublicId = (url: string): string | null => {
  if (!url?.startsWith('http')) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match?.[1] ?? null;
};
