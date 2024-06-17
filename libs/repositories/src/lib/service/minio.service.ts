import { Injectable, Global } from "@nestjs/common";
import * as Minio from "minio";
import { ConfigService } from "@nestjs/config";
@Global()
@Injectable()
export class MinioService {
  minioClient: Minio.Client;
  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      accessKey: this.configService.get<string>("MINIO_ACCESS_KEY"),
      secretKey: this.configService.get<string>("MINIO_SECRET_KEY"),
    });
  }
  public async presignedPutObject(
    bucketName: string,
    objectName: string,
    expiry: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedPutObject(
        bucketName,
        objectName,
        expiry,
        function (err, presignedUrl) {
          if (err) reject(err);
          resolve(presignedUrl);
        }
      );
    });
  }
}
