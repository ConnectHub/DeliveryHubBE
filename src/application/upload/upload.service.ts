import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { env } from '@/infra/env/env.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger('UploadService');
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      correctClockSkew: true,
    });
  }

  async uploadFile(file: string): Promise<string> {
    this.logger.log('Uploading file');
    const fileName = this.generateFileName('.jpeg');
    const uploadedFile = await this.s3
      .upload({
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: this.imgToBuffer(file),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
      })
      .promise();
    return uploadedFile.Location;
  }

  async uploadSign(file: string): Promise<string> {
    this.logger.log('Uploading sign');
    const fileName = this.generateFileName('.png');
    const uploadedFile = await this.s3
      .upload({
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: this.imgToBuffer(file),
        ContentEncoding: 'base64',
        ContentType: 'image/png',
      })
      .promise();
    return uploadedFile.Location;
  }

  private imgToBuffer(file: string): Buffer {
    return Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  }

  private generateFileName(extension: string): string {
    return randomUUID() + extension;
  }
}
