import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { LoggingPlugin } from 'src/shared/plugins/logging';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "ARTICLE-SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "article-service",
            brokers: [process.env.KAFKA_URL],
          },
          consumer: {
            groupId: "article-service",
          },
        },
      },
    ]),
  ],
  providers: [ArticleResolver, ArticleService, LoggingPlugin],
})
export class ArticleModule {}
