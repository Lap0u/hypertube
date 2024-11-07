import {
  BadRequestException,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const fileMimeTypeFilter = (req, file, callback) => {
  // Only allow specified file types
  if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Invalid file type'), false);
  }
  callback(null, true);
};

export const fileValidation = (file?: Express.Multer.File) => {
  if (file) {
    // Apply the validation manually since we need custom logic
    const isValidFile = new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
    }).transform(file);

    if (!isValidFile) throw new BadRequestException('Invalid file format.');
  }
};
