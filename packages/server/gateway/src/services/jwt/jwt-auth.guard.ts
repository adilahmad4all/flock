import {
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ClientKafka } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class GraphQLAuthGuard extends AuthGuard("jwt") implements OnModuleInit {
  constructor(
    @Inject("AUTH-SERVICE") private readonly authClient: ClientKafka
  ) {
    super();
  }
  onModuleInit() {
    // this.authClient.subscribeToResponseOf("get_user_by_username");
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // this.authClient
    //   .send("get_user_by_username", 'username')
    //   .pipe(map((r_user) => r_user));
    return req;
  }
}
