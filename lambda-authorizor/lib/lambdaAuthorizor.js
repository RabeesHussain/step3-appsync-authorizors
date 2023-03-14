"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaAuthorizor = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_appsync_alpha_1 = require("@aws-cdk/aws-appsync-alpha");
class LambdaAuthorizor extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const lambdaAuthorizor = new aws_cdk_lib_1.aws_lambda.Function(this, 'AppsyncLambdaAuthorizor', {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset('lambdaAuthorizor'),
            memorySize: 1024
        });
        // Create an appSync API
        const appsyncApi = new appsync.GraphqlApi(this, 'api', {
            name: 'api-development',
            schema: appsync.Schema.fromAsset('schema/schema.graphql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: aws_appsync_alpha_1.AuthorizationType.LAMBDA, lambdaAuthorizerConfig: { handler: lambdaAuthorizor, resultsCacheTtl: cdk.Duration.seconds(0) }
                }
            }
        });
        // Create a new lambda function
        // const lambdaFnAppsync = new cdk.aws_lambda.Function(
        //   this,
        //   'appsynctestLambda',
        //   {
        //     functionName: `appsynctestlambda`,
        //     runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        //     code: cdk.aws_lambda.Code.fromAsset('functions'),
        //     handler: 'main.handler',
        //   }
        // );
        const todosLambda = new aws_cdk_lib_1.aws_lambda.Function(this, 'AppsyncTodoHandler', {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_12_X,
            handler: 'main.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset('functions'),
            memorySize: 1024
        });
        const todosTable = new aws_cdk_lib_1.aws_dynamodb.Table(this, 'TodosTable', {
            partitionKey: {
                name: 'id',
                type: aws_cdk_lib_1.aws_dynamodb.AttributeType.STRING,
            },
            billingMode: aws_cdk_lib_1.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
        todosTable.grantFullAccess(todosLambda);
        todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);
        // Add lambda as data source
        const lambdaDs = appsyncApi.addLambdaDataSource('lambdaDatasource', todosLambda);
        // Add resolvers
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodos',
        });
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodoById',
        });
        lambdaDs.createResolver({
            typeName: 'Mutation',
            fieldName: 'addTodo',
        });
        lambdaDs.createResolver({
            typeName: 'Mutation',
            fieldName: 'updateTodo',
        });
        lambdaDs.createResolver({
            typeName: 'Mutation',
            fieldName: 'deleteTodo',
        });
    }
}
exports.LambdaAuthorizor = LambdaAuthorizor;
// import { Stack, StackProps, aws_lambda as lambda } from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as appsync from '@aws-cdk/aws-appsync-alpha'
// import { aws_dynamodb as dynamodb } from 'aws-cdk-lib'
// export class AppsyncDynamodbLambdaDataSourceStack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);
//     const appsyncApi = new appsync.GraphqlApi(this, 'api', {
//       name: 'appsync-dynodb-lambda-api',
//       schema: appsync.Schema.fromAsset('schema/schema.graphql')
//     })
//     const todosLambda = new lambda.Function(this, 'AppsyncTodoHandler', {
//       runtime: lambda.Runtime.NODEJS_12_X,
//       handler: 'main.handler',
//       code: lambda.Code.fromAsset('functions'),
//       memorySize: 1024
//     });
//     const lambdaDs = appsyncApi.addLambdaDataSource('lambdaDatasource', todosLambda);
//     lambdaDs.createResolver({
//       typeName: "Query",
//       fieldName: "getTodos"
//     });
//     lambdaDs.createResolver({
//       typeName: "Query",
//       fieldName: "getTodoById"
//     });
//     lambdaDs.createResolver({
//       typeName: "Mutation",
//       fieldName: "addTodo"
//     });
//     lambdaDs.createResolver({
//       typeName: "Mutation",
//       fieldName: "deleteTodo"
//     });
//     lambdaDs.createResolver({
//       typeName: "Mutation",
//       fieldName: "updateTodo"
//     });
//     const todosTable = new dynamodb.Table(this, 'TodosTable', {
//       partitionKey: {
//         name: 'id',
//         type: dynamodb.AttributeType.STRING,
//       },
//       billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
//     });
//     todosTable.grantFullAccess(todosLambda)
//     todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhQXV0aG9yaXpvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbWJkYUF1dGhvcml6b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLHNEQUFzRDtBQUN0RCw2Q0FBcUc7QUFDckcsa0VBQStEO0FBRS9ELE1BQWEsZ0JBQWlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUl4QixNQUFNLGdCQUFnQixHQUFHLElBQUksd0JBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQzVFLE9BQU8sRUFBRSx3QkFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLElBQUksRUFBRSx3QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7WUFDL0MsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDO1FBSUgsd0JBQXdCO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3JELElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO1lBQ3pELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBQztvQkFDckIsaUJBQWlCLEVBQUMscUNBQWlCLENBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQztpQkFDcEk7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUVGLCtCQUErQjtRQUMv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QXVFO0FBRXZFLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgeyBhd3NfZHluYW1vZGIgYXMgZHluYW1vZGIsIGF3c19sYW1iZGEgYXMgbGFtYmRhLCBEdXJhdGlvbiwgUmVtb3ZhbFBvbGljeSB9IGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblR5cGUgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5cbmV4cG9ydCBjbGFzcyBMYW1iZGFBdXRob3Jpem9yIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG5cblxuICAgIGNvbnN0IGxhbWJkYUF1dGhvcml6b3IgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdBcHBzeW5jTGFtYmRhQXV0aG9yaXpvcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGFBdXRob3Jpem9yJyksXG4gICAgICBtZW1vcnlTaXplOiAxMDI0XG4gICAgfSk7XG5cblxuXG4gICAgLy8gQ3JlYXRlIGFuIGFwcFN5bmMgQVBJXG4gICAgY29uc3QgYXBwc3luY0FwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ2FwaScsIHtcbiAgICAgIG5hbWU6ICdhcGktZGV2ZWxvcG1lbnQnLFxuICAgICAgc2NoZW1hOiBhcHBzeW5jLlNjaGVtYS5mcm9tQXNzZXQoJ3NjaGVtYS9zY2hlbWEuZ3JhcGhxbCcpLFxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjp7XG4gICAgICAgIGF1dGhvcml6YXRpb25UeXBlOkF1dGhvcml6YXRpb25UeXBlLkxBTUJEQSxsYW1iZGFBdXRob3JpemVyQ29uZmlnOntoYW5kbGVyOiBsYW1iZGFBdXRob3Jpem9yLHJlc3VsdHNDYWNoZVR0bDpjZGsuRHVyYXRpb24uc2Vjb25kcygwKX1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgbGFtYmRhIGZ1bmN0aW9uXG4gICAgLy8gY29uc3QgbGFtYmRhRm5BcHBzeW5jID0gbmV3IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uKFxuICAgIC8vICAgdGhpcyxcbiAgICAvLyAgICdhcHBzeW5jdGVzdExhbWJkYScsXG4gICAgLy8gICB7XG4gICAgLy8gICAgIGZ1bmN0aW9uTmFtZTogYGFwcHN5bmN0ZXN0bGFtYmRhYCxcbiAgICAvLyAgICAgcnVudGltZTogY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAvLyAgICAgY29kZTogY2RrLmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2Z1bmN0aW9ucycpLFxuICAgIC8vICAgICBoYW5kbGVyOiAnbWFpbi5oYW5kbGVyJyxcbiAgICAvLyAgIH1cbiAgICAvLyApO1xuXG4gICAgY29uc3QgdG9kb3NMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdBcHBzeW5jVG9kb0hhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdtYWluLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdmdW5jdGlvbnMnKSxcbiAgICAgIG1lbW9yeVNpemU6IDEwMjRcbiAgICB9KTtcblxuXG4gICAgY29uc3QgdG9kb3NUYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnVG9kb3NUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4gICAgfSk7XG5cbiAgICB0b2Rvc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0b2Rvc0xhbWJkYSlcbiAgICB0b2Rvc0xhbWJkYS5hZGRFbnZpcm9ubWVudCgnVE9ET1NfVEFCTEUnLCB0b2Rvc1RhYmxlLnRhYmxlTmFtZSk7XG5cblxuICAgIC8vIEFkZCBsYW1iZGEgYXMgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBsYW1iZGFEcyA9IGFwcHN5bmNBcGkuYWRkTGFtYmRhRGF0YVNvdXJjZSgnbGFtYmRhRGF0YXNvdXJjZScsIHRvZG9zTGFtYmRhKTtcblxuICAgIC8vIEFkZCByZXNvbHZlcnNcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ1F1ZXJ5JyxcbiAgICAgIGZpZWxkTmFtZTogJ2dldFRvZG9zJyxcbiAgICB9KTtcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ1F1ZXJ5JyxcbiAgICAgIGZpZWxkTmFtZTogJ2dldFRvZG9CeUlkJyxcbiAgICB9KTtcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgIGZpZWxkTmFtZTogJ2FkZFRvZG8nLFxuICAgIH0pO1xuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiAnTXV0YXRpb24nLFxuICAgICAgZmllbGROYW1lOiAndXBkYXRlVG9kbycsXG4gICAgfSk7XG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6ICdNdXRhdGlvbicsXG4gICAgICBmaWVsZE5hbWU6ICdkZWxldGVUb2RvJyxcbiAgICB9KTtcbiAgfVxufVxuXG5cbi8vIGltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBhd3NfbGFtYmRhIGFzIGxhbWJkYSB9IGZyb20gJ2F3cy1jZGstbGliJztcbi8vIGltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSdcbi8vIGltcG9ydCB7IGF3c19keW5hbW9kYiBhcyBkeW5hbW9kYiB9IGZyb20gJ2F3cy1jZGstbGliJ1xuXG4vLyBleHBvcnQgY2xhc3MgQXBwc3luY0R5bmFtb2RiTGFtYmRhRGF0YVNvdXJjZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuLy8gICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbi8vICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuLy8gICAgIGNvbnN0IGFwcHN5bmNBcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdhcGknLCB7XG4vLyAgICAgICBuYW1lOiAnYXBwc3luYy1keW5vZGItbGFtYmRhLWFwaScsXG4vLyAgICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnc2NoZW1hL3NjaGVtYS5ncmFwaHFsJylcbi8vICAgICB9KVxuXG4vLyAgICAgY29uc3QgdG9kb3NMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdBcHBzeW5jVG9kb0hhbmRsZXInLCB7XG4vLyAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbi8vICAgICAgIGhhbmRsZXI6ICdtYWluLmhhbmRsZXInLFxuLy8gICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdmdW5jdGlvbnMnKSxcbi8vICAgICAgIG1lbW9yeVNpemU6IDEwMjRcbi8vICAgICB9KTtcblxuLy8gICAgIGNvbnN0IGxhbWJkYURzID0gYXBwc3luY0FwaS5hZGRMYW1iZGFEYXRhU291cmNlKCdsYW1iZGFEYXRhc291cmNlJywgdG9kb3NMYW1iZGEpO1xuXG4vLyAgICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuLy8gICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbi8vICAgICAgIGZpZWxkTmFtZTogXCJnZXRUb2Rvc1wiXG4vLyAgICAgfSk7XG5cbi8vICAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4vLyAgICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuLy8gICAgICAgZmllbGROYW1lOiBcImdldFRvZG9CeUlkXCJcbi8vICAgICB9KTtcblxuXG4vLyAgICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuLy8gICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbi8vICAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCJcbi8vICAgICB9KTtcblxuLy8gICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbi8vICAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4vLyAgICAgICBmaWVsZE5hbWU6IFwiZGVsZXRlVG9kb1wiXG4vLyAgICAgfSk7XG5cbi8vICAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4vLyAgICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuLy8gICAgICAgZmllbGROYW1lOiBcInVwZGF0ZVRvZG9cIlxuLy8gICAgIH0pO1xuXG4vLyAgICAgY29uc3QgdG9kb3NUYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnVG9kb3NUYWJsZScsIHtcbi8vICAgICAgIHBhcnRpdGlvbktleToge1xuLy8gICAgICAgICBuYW1lOiAnaWQnLFxuLy8gICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbi8vICAgICAgIH0sXG4vLyAgICAgICBiaWxsaW5nTW9kZTogZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUXG4vLyAgICAgfSk7XG5cbi8vICAgICB0b2Rvc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0b2Rvc0xhbWJkYSlcbi8vICAgICB0b2Rvc0xhbWJkYS5hZGRFbnZpcm9ubWVudCgnVE9ET1NfVEFCTEUnLCB0b2Rvc1RhYmxlLnRhYmxlTmFtZSk7XG5cbi8vICAgfVxuLy8gfVxuIl19