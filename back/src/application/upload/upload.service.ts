import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private imgToBuffer(file: string): Buffer {
    return Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  }

  private generateFileName(): string {
    return randomUUID() + '.png';
  }

  async uploadSign(file: string): Promise<string> {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      correctClockSkew: true,
    });
    const uploadedFile = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.generateFileName(),
        Body: this.imgToBuffer(file),
        ContentEncoding: 'base64',
        ContentType: 'image/png',
      })
      .promise();
    return uploadedFile.Location;
  }
}
