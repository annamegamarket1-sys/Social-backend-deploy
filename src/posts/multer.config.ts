import { imageFileFilter, imageLimits, memStorage } from '../shared/upload';

export const multerConfig = {
  storage: memStorage,
  fileFilter: imageFileFilter,
  limits: { ...imageLimits, files: 4 },
};
