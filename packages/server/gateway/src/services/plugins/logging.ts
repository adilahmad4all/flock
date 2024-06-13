// import { Plugin } from '@nestjs/apollo';
// import { Logger } from '@nestjs/common';
// import {
//   ApolloServerPlugin,
//   GraphQLRequestListener,
// } from 'apollo-server-plugin-base';
// import {
//   BaseContext,
//   GraphQLRequestContext,
//   GraphQLRequestContextWillSendResponse,
// } from 'apollo-server-types';
// import * as util from 'util';

// @Plugin()
// export class LoggingPlugin implements ApolloServerPlugin {
//   constructor(private readonly logger: Logger) {}

//   async requestDidStart(
//     requestContext: GraphQLRequestContext,
//   ): Promise<GraphQLRequestListener> {
//     const thatLogger = this.logger;
//     if (requestContext.request.operationName !== 'IntrospectionQuery') {
//       thatLogger.log(
//         `request query: ${requestContext.request.query || 'undefined'}`,
//       );
//     }
//     return {
//       async willSendResponse(
//         requestContextWillSendResponse: GraphQLRequestContextWillSendResponse<BaseContext>,
//       ): Promise<void> {
//         if (
//           requestContextWillSendResponse.request.operationName !==
//           'IntrospectionQuery'
//         ) {
//           if (!requestContextWillSendResponse.errors) {
//             thatLogger.log(`response without any errors`);
//           } else {
//             const errors = requestContextWillSendResponse.errors.concat();
//             const responseErrors =
//               requestContextWillSendResponse.response.errors?.concat();
//             if (errors && responseErrors) {
//               for (let i = 0; i < errors.length; i++) {
//                 const result = {
//                   ...responseErrors[i],
//                   stack: errors[i].stack,
//                 };
//                 if (result.extensions) {
//                   delete result.extensions.exception;
//                 }
//                 if (
//                   result.extensions &&
//                   result.extensions.code !== 'INTERNAL_SERVER_ERROR'
//                 ) {
//                   thatLogger.warn(
//                     `response with errors: ${util.inspect(result, {
//                       depth: 4,
//                     })}`,
//                   );
//                 } else {
//                   thatLogger.error(
//                     `response with errors: ${util.inspect(result, {
//                       depth: 4,
//                     })}`,
//                   );
//                 }
//               }
//             }
//           }
//         }
//       },
//     };
//   }
// }


import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(context): Promise<GraphQLRequestListener<any>> {
    console.log('Request started');
    // console.debug(context)
    return {
      async willSendResponse(context,) {
        console.log('Will send response');
        console.debug(context.errors)
        console.debug(context.request)
      },
    };
  }
}
