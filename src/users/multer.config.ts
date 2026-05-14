import { imageFileFilter, imageLimits, memStorage } from '../shared/upload';

export const profileMulterConfig = {
  storage: memStorage,
  fileFilter: imageFileFilter,
  limits: imageLimits,
};
