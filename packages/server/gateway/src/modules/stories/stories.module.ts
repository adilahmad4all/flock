import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { StoriesResolver } from "./stories.resolver";
import { StoriesService } from "./stories.service";
import { LoggingPlugin } from "src/services/plugins/logging";

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
  providers: [StoriesResolver, StoriesService, LoggingPlugin],
})
export class StoriesModule {}
