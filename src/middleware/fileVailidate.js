import path from 'path';

export const fileValidator = (fieldKeys = [], maxSizeMB, extensions = []) => {
  return (req, res, next) => {
    if (!req.files) req.files = {};

    for (let key of fieldKeys) {
      const isOptional = key.startsWith('?');
      const cleanKey = isOptional ? key.slice(1) : key;
      const fileField = req.files[cleanKey];

      if (!fileField) {
        if (!isOptional) {
          return res.status(400).json({ message: `Missing required file in '${cleanKey}' field.` });
        }
        continue;
      }

      const files = Array.isArray(fileField) ? fileField : [fileField];

      for (const file of files) {
        const ext = path.extname(file.name).toLowerCase();
        const sizeInMB = file.size / (1024 * 1024);

        if (!extensions.includes(ext)) {
          return res.status(400).json({
            message: `Invalid file type for '${cleanKey}'. Got '${ext}', allowed: ${extensions.join(', ')}`,
          });
        }

        if (sizeInMB > maxSizeMB) {
          return res.status(400).json({
            message: `File in '${cleanKey}' exceeds size limit of ${maxSizeMB}MB.`,
          });
        }
      }
    }

    next();
  };
};
