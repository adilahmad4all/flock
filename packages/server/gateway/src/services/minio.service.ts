import { Injectable ,Global} from "@nestjs/common";
import * as Minio from "minio";
@Global()
@Injectable()
export class MinioService {
  minioClient: Minio.Client;
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: "localhost",
      port: 9000,
      useSSL: true,
      accessKey: "Q3AM3UQ867SPQQA43P2F",
      secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    });
  }
  public presignedPutObject(
    bucketName: string,
    objectName: string,
    expiry: number
  ): string | void {
    this.minioClient.presignedPutObject(
      bucketName,
      objectName,
      expiry,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        console.log(presignedUrl);
        return presignedUrl;
      }
    );
  }
}
