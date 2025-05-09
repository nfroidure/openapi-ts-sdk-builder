import { describe, test, expect } from '@jest/globals';
import { generateSDKFromOpenAPI } from './index.js';

import { type OpenAPI } from 'ya-open-api-types';

describe('generateSDKFromOpenAPI', () => {
  test('should work', async () => {
    const schema: OpenAPI = {
      openapi: '3.1.0',
      info: {
        version: '3.1.3',
        title: '@whook/example',
        description: 'A basic Whook server',
      },
      servers: [{ url: 'http://192.168.10.149:8000/v3' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            description: 'Bearer authentication with a user API token',
            type: 'http',
            scheme: 'bearer',
          },
          fakeAuth: {
            description: 'A fake authentication for development purpose.',
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
      paths: {
        '/openAPI': {
          get: {
            operationId: 'getOpenAPI',
            summary: 'Get API documentation.',
            tags: ['system'],
            responses: {
              '200': {
                description: 'Provides the private Open API documentation',
                content: {
                  'application/json': { schema: { type: 'object' } },
                },
              },
            },
            security: [{}, { bearerAuth: ['admin'] }, { fakeAuth: ['admin'] }],
            parameters: [],
          },
        },
        '/ping': {
          get: {
            operationId: 'getPing',
            summary: "Checks API's availability.",
            tags: ['system'],
            responses: {
              '200': {
                description: 'Pong',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        pong: { type: 'string', enum: ['pong'] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/delay': {
          get: {
            operationId: 'getDelay',
            summary: 'Answer after a given delay.',
            tags: ['system'],
            parameters: [
              {
                in: 'query',
                name: 'duration',
                required: true,
                description: 'Duration in milliseconds',
                schema: { type: 'number' },
              },
              {
                name: 'Cookie',
                in: 'header',
                required: false,
                example: 'a_cookie=yop',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'X-Application-Version',
                in: 'header',
                required: false,
                example: '1.1.2-beta.1',
                schema: {
                  type: 'string',
                  pattern:
                    '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$',
                },
              },
            ],
            responses: { '204': { description: 'Delay expired' } },
          },
        },
        '/diag': {
          get: {
            operationId: 'getDiagnostic',
            summary: "Returns current API's transactions.",
            security: [{ bearerAuth: ['admin'] }, { fakeAuth: ['admin'] }],
            tags: ['system'],
            parameters: [],
            responses: {
              '200': {
                description: 'Diagnostic',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: true,
                    },
                  },
                },
              },
            },
          },
        },
        '/time': {
          get: {
            operationId: 'getTime',
            summary: 'Get API internal clock date.',
            tags: ['system'],
            responses: {
              '200': {
                description: 'Server current date',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        currentDate: {
                          type: 'string',
                          format: 'date-time',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/echo': {
          put: {
            operationId: 'putEcho',
            summary: 'Echoes what it takes.',
            tags: ['system'],
            requestBody: {
              description: 'The input sentence',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['echo'],
                    additionalProperties: false,
                    properties: { echo: { type: 'string' } },
                  },
                  example: { echo: 'Repeat this!' },
                },
              },
            },
            responses: {
              '200': {
                description: 'The actual echo',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['echo'],
                      additionalProperties: false,
                      properties: { echo: { type: 'string' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [],
    };
    expect(
      await generateSDKFromOpenAPI(JSON.stringify(schema), {
        sdkVersion: '1.0.0',
        ignoredParametersNames: ['Cookie'],
        undocumentedParametersNames: ['X-Application-Version'],
      }),
    ).toMatchSnapshot();
  });

  test('should work with sdkName', async () => {
    const schema: OpenAPI = {
      openapi: '3.1.0',
      info: {
        version: '3.1.3',
        title: '@whook/example',
        description: 'A basic Whook server',
      },
      servers: [{ url: 'http://192.168.10.149:8000/v3' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            description: 'Bearer authentication with a user API token',
            type: 'http',
            scheme: 'bearer',
          },
          fakeAuth: {
            description: 'A fake authentication for development purpose.',
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
      paths: {
        '/openAPI': {
          get: {
            operationId: 'getOpenAPI',
            summary: 'Get API documentation.',
            tags: ['system'],
            responses: {
              '200': {
                description: 'Provides the private Open API documentation',
                content: {
                  'application/json': { schema: { type: 'object' } },
                },
              },
            },
            security: [{}, { bearerAuth: ['admin'] }, { fakeAuth: ['admin'] }],
            parameters: [],
          },
        },
        '/ping': {
          get: {
            operationId: 'getPing',
            summary: "Checks API's availability.",
            tags: ['system'],
            responses: {
              '200': {
                description: 'Pong',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        pong: { type: 'string', enum: ['pong'] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/delay': {
          get: {
            operationId: 'getDelay',
            summary: 'Answer after a given delay.',
            tags: ['system'],
            parameters: [
              {
                in: 'query',
                name: 'duration',
                required: true,
                description: 'Duration in milliseconds',
                schema: { type: 'number' },
              },
              {
                name: 'Cookie',
                in: 'header',
                required: false,
                example: 'a_cookie=yop',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'X-Application-Version',
                in: 'header',
                required: false,
                example: '1.1.2-beta.1',
                schema: {
                  type: 'string',
                  pattern:
                    '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$',
                },
              },
            ],
            responses: { '204': { description: 'Delay expired' } },
          },
        },
        '/diag': {
          get: {
            operationId: 'getDiagnostic',
            summary: "Returns current API's transactions.",
            security: [{ bearerAuth: ['admin'] }, { fakeAuth: ['admin'] }],
            tags: ['system'],
            parameters: [],
            responses: {
              '200': {
                description: 'Diagnostic',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: true,
                    },
                  },
                },
              },
            },
          },
        },
        '/time': {
          get: {
            operationId: 'getTime',
            summary: 'Get API internal clock date.',
            tags: ['system'],
            responses: {
              '200': {
                description: 'Server current date',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        currentDate: {
                          type: 'string',
                          format: 'date-time',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/echo': {
          put: {
            operationId: 'putEcho',
            summary: 'Echoes what it takes.',
            tags: ['system'],
            requestBody: {
              description: 'The input sentence',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['echo'],
                    additionalProperties: false,
                    properties: { echo: { type: 'string' } },
                  },
                  example: { echo: 'Repeat this!' },
                },
              },
            },
            responses: {
              '200': {
                description: 'The actual echo',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['echo'],
                      additionalProperties: false,
                      properties: { echo: { type: 'string' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [],
    };
    expect(
      await generateSDKFromOpenAPI(JSON.stringify(schema), {
        sdkVersion: '1.0.0',
        sdkName: 'FooAPI',
        ignoredParametersNames: ['Cookie'],
        undocumentedParametersNames: ['X-Application-Version'],
      }),
    ).toMatchSnapshot();
  });

  test('should work with refs', async () => {
    const schema: OpenAPI = {
      openapi: '3.1.0',
      info: {
        version: '3.1.3',
        title: '@whook/example',
        description: 'A basic Whook server',
      },
      servers: [{ url: 'http://192.168.10.149:8000/v3' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            description: 'Bearer authentication with a user API token',
            type: 'http',
            scheme: 'bearer',
          },
          fakeAuth: {
            description: 'A fake authentication for development purpose.',
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
        schemas: {
          Echo: {
            type: 'object',
            required: ['echo'],
            additionalProperties: false,
            properties: { echo: { type: 'string' } },
          },
        },
      },
      paths: {
        '/echo': {
          put: {
            operationId: 'putEcho',
            summary: 'Echoes what it takes.',
            tags: ['system'],
            requestBody: {
              description: 'The input sentence',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Echo' },
                  example: { echo: 'Repeat this!' },
                },
              },
            },
            responses: {
              '200': {
                description: 'The actual echo',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['echo'],
                      additionalProperties: false,
                      properties: { echo: { type: 'string' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [],
    };
    expect(
      await generateSDKFromOpenAPI(JSON.stringify(schema), {
        sdkVersion: '1.0.0',
      }),
    ).toMatchSnapshot();
  });

  test('should work with Pet Store', async () => {
    const schema: OpenAPI = {
      openapi: '3.1.0',
      info: {
        title: 'OpenAPI Petstore',
        description:
          'This is a sample server Petstore server. For this sample, you can use the api key `special-key` to test the authorization filters. For OAuth2 flow, you may use `user` as both username and password when asked to login.',
        license: {
          name: 'Apache-2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
        version: '1.0.0',
      },
      servers: [{ url: 'http://192.168.10.149:8000/v3' }],
      tags: [
        {
          name: 'pet',
          description: 'Everything about your Pets',
        },
        {
          name: 'store',
          description: 'Access to Petstore orders',
        },
        {
          name: 'user',
          description: 'Operations about user',
        },
      ],
      paths: {
        '/pet': {
          put: {
            tags: ['pet'],
            summary: 'Update an existing pet',
            operationId: 'updatePet',
            requestBody: {
              $ref: '#/components/requestBodies/Pet',
            },
            responses: {
              '400': {
                description: 'Invalid ID supplied',
              },
              '404': {
                description: 'Pet not found',
              },
              '405': {
                description: 'Validation exception',
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
          post: {
            tags: ['pet'],
            summary: 'Add a new pet to the store',
            operationId: 'addPet',
            requestBody: {
              $ref: '#/components/requestBodies/Pet',
            },
            responses: {
              '405': {
                description: 'Invalid input',
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
        },
        '/pet/findByStatus': {
          get: {
            tags: ['pet'],
            summary: 'Finds Pets by status',
            description:
              'Multiple status values can be provided with comma separated strings',
            operationId: 'findPetsByStatus',
            parameters: [
              {
                name: 'status',
                in: 'query',
                description:
                  'Status values that need to be considered for filter',
                required: true,
                style: 'form',
                explode: false,
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                    default: 'available',
                    enum: ['available', 'pending', 'sold'],
                  },
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Pet',
                      },
                    },
                  },
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Pet',
                      },
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid status value',
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
        },
        '/pet/findByTags': {
          get: {
            tags: ['pet'],
            summary: 'Finds Pets by tags',
            description:
              'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
            operationId: 'findPetsByTags',
            parameters: [
              {
                name: 'tags',
                in: 'query',
                description: 'Tags to filter by',
                required: true,
                style: 'form',
                explode: false,
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Pet',
                      },
                    },
                  },
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Pet',
                      },
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid tag value',
              },
            },
            deprecated: true,
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
        },
        '/pet/{petId}': {
          get: {
            tags: ['pet'],
            summary: 'Find pet by ID',
            description: 'Returns a single pet',
            operationId: 'getPetById',
            parameters: [
              {
                name: 'petId',
                in: 'path',
                description: 'ID of pet to return',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      $ref: '#/components/schemas/Pet',
                    },
                  },
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Pet',
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid ID supplied',
              },
              '404': {
                description: 'Pet not found',
              },
            },
            security: [
              {
                api_key: [],
              },
            ],
          },
          post: {
            tags: ['pet'],
            summary: 'Updates a pet in the store with form data',
            operationId: 'updatePetWithForm',
            parameters: [
              {
                name: 'petId',
                in: 'path',
                description: 'ID of pet that needs to be updated',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            ],
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    $ref: '#/components/schemas/body',
                  },
                },
              },
            },
            responses: {
              '405': {
                description: 'Invalid input',
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
          delete: {
            tags: ['pet'],
            summary: 'Deletes a pet',
            operationId: 'deletePet',
            parameters: [
              {
                name: 'api_key',
                in: 'header',
                required: false,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'petId',
                in: 'path',
                description: 'Pet id to delete',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            ],
            responses: {
              '400': {
                description: 'Invalid pet value',
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
        },
        '/pet/{petId}/uploadImage': {
          post: {
            tags: ['pet'],
            summary: 'uploads an image',
            operationId: 'uploadFile',
            parameters: [
              {
                name: 'petId',
                in: 'path',
                description: 'ID of pet to update',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            ],
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    $ref: '#/components/schemas/body_1',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ApiResponse',
                    },
                  },
                },
              },
            },
            security: [
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
          },
        },
        '/store/inventory': {
          get: {
            tags: ['store'],
            summary: 'Returns pet inventories by status',
            description: 'Returns a map of status codes to quantities',
            operationId: 'getInventory',
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: {
                        type: 'integer',
                        format: 'int32',
                      },
                    },
                  },
                },
              },
            },
            security: [
              {
                api_key: [],
              },
            ],
          },
        },
        '/store/order': {
          post: {
            tags: ['store'],
            summary: 'Place an order for a pet',
            operationId: 'placeOrder',
            requestBody: {
              description: 'order placed for purchasing the pet',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Order',
                  },
                },
              },
              required: true,
            },
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid Order',
              },
            },
          },
        },
        '/store/order/{orderId}': {
          get: {
            tags: ['store'],
            summary: 'Find purchase order by ID',
            description:
              'For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions',
            operationId: 'getOrderById',
            parameters: [
              {
                name: 'orderId',
                in: 'path',
                description: 'ID of pet that needs to be fetched',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  maximum: 5,
                  minimum: 1,
                  type: 'integer',
                  format: 'int64',
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid ID supplied',
              },
              '404': {
                description: 'Order not found',
              },
            },
          },
          delete: {
            tags: ['store'],
            summary: 'Delete purchase order by ID',
            description:
              'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
            operationId: 'deleteOrder',
            parameters: [
              {
                name: 'orderId',
                in: 'path',
                description: 'ID of the order that needs to be deleted',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '400': {
                description: 'Invalid ID supplied',
              },
              '404': {
                description: 'Order not found',
              },
            },
          },
        },
        '/user': {
          post: {
            tags: ['user'],
            summary: 'Create user',
            description: 'This can only be done by the logged in user.',
            operationId: 'createUser',
            requestBody: {
              description: 'Created user object',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'successful operation',
              },
            },
          },
        },
        '/user/createWithArray': {
          post: {
            tags: ['user'],
            summary: 'Creates list of users with given input array',
            operationId: 'createUsersWithArrayInput',
            requestBody: {
              $ref: '#/components/requestBodies/UserArray',
            },
            responses: {
              default: {
                description: 'successful operation',
              },
            },
          },
        },
        '/user/createWithList': {
          post: {
            tags: ['user'],
            summary: 'Creates list of users with given input array',
            operationId: 'createUsersWithListInput',
            requestBody: {
              $ref: '#/components/requestBodies/UserArray',
            },
            responses: {
              default: {
                description: 'successful operation',
              },
            },
          },
        },
        '/user/login': {
          get: {
            tags: ['user'],
            summary: 'Logs user into the system',
            operationId: 'loginUser',
            parameters: [
              {
                name: 'username',
                in: 'query',
                description: 'The user name for login',
                required: true,
                style: 'form',
                explode: true,
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'password',
                in: 'query',
                description: 'The password for login in clear text',
                required: true,
                style: 'form',
                explode: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                headers: {
                  'X-Rate-Limit': {
                    description: 'calls per hour allowed by the user',
                    style: 'simple',
                    explode: false,
                    schema: {
                      type: 'integer',
                      format: 'int32',
                    },
                  },
                  'X-Expires-After': {
                    description: 'date in UTC when token expires',
                    style: 'simple',
                    explode: false,
                    schema: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
                content: {
                  'application/xml': {
                    schema: {
                      type: 'string',
                    },
                  },
                  'application/json': {
                    schema: {
                      type: 'string',
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid username/password supplied',
              },
            },
          },
        },
        '/user/logout': {
          get: {
            tags: ['user'],
            summary: 'Logs out current logged in user session',
            operationId: 'logoutUser',
            responses: {
              default: {
                description: 'successful operation',
              },
            },
          },
        },
        '/user/{username}': {
          get: {
            tags: ['user'],
            summary: 'Get user by user name',
            operationId: 'getUserByName',
            parameters: [
              {
                name: 'username',
                in: 'path',
                description:
                  'The name that needs to be fetched. Use user1 for testing.',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'successful operation',
                content: {
                  'application/xml': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid username supplied',
              },
              '404': {
                description: 'User not found',
              },
            },
          },
          put: {
            tags: ['user'],
            summary: 'Updated user',
            description: 'This can only be done by the logged in user.',
            operationId: 'updateUser',
            parameters: [
              {
                name: 'username',
                in: 'path',
                description: 'name that need to be deleted',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              description: 'Updated user object',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
              required: true,
            },
            responses: {
              '400': {
                description: 'Invalid user supplied',
              },
              '404': {
                description: 'User not found',
              },
            },
          },
          delete: {
            tags: ['user'],
            summary: 'Delete user',
            description: 'This can only be done by the logged in user.',
            operationId: 'deleteUser',
            parameters: [
              {
                name: 'username',
                in: 'path',
                description: 'The name that needs to be deleted',
                required: true,
                style: 'simple',
                explode: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '400': {
                description: 'Invalid username supplied',
              },
              '404': {
                description: 'User not found',
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Order: {
            title: 'Pet Order',
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              petId: {
                type: 'integer',
                format: 'int64',
              },
              quantity: {
                type: 'integer',
                format: 'int32',
              },
              shipDate: {
                type: 'string',
                format: 'date-time',
              },
              status: {
                type: 'string',
                description: 'Order Status',
                enum: ['placed', 'approved', 'delivered'],
              },
              complete: {
                type: 'boolean',
                default: false,
              },
            },
            description: 'An order for a pets from the pet store',
            example: {
              petId: 6,
              quantity: 1,
              id: 0,
              shipDate: '2000-01-23T04:56:07.000Z',
              complete: false,
              status: 'placed',
            },
            xml: {
              name: 'Order',
            },
          },
          Category: {
            title: 'Pet category',
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              name: {
                type: 'string',
              },
            },
            description: 'A category for a pet',
            example: {
              name: 'name',
              id: 6,
            },
            xml: {
              name: 'Category',
            },
          },
          User: {
            title: 'a User',
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              username: {
                type: 'string',
              },
              firstName: {
                type: 'string',
              },
              lastName: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
              phone: {
                type: 'string',
              },
              userStatus: {
                type: 'integer',
                description: 'User Status',
                format: 'int32',
              },
            },
            description: 'A User who is purchasing from the pet store',
            example: {
              firstName: 'firstName',
              lastName: 'lastName',
              password: 'password',
              userStatus: 6,
              phone: 'phone',
              id: 0,
              email: 'email',
              username: 'username',
            },
            xml: {
              name: 'User',
            },
          },
          Tag: {
            title: 'Pet Tag',
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              name: {
                type: 'string',
              },
            },
            description: 'A tag for a pet',
            example: {
              name: 'name',
              id: 1,
            },
            xml: {
              name: 'Tag',
            },
          },
          Pet: {
            title: 'a Pet',
            required: ['name', 'photoUrls'],
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              category: {
                $ref: '#/components/schemas/Category',
              },
              name: {
                type: 'string',
                example: 'doggie',
              },
              photoUrls: {
                type: 'array',
                xml: {
                  name: 'photoUrl',
                  wrapped: true,
                },
                items: {
                  type: 'string',
                },
              },
              tags: {
                type: 'array',
                xml: {
                  name: 'tag',
                  wrapped: true,
                },
                items: {
                  $ref: '#/components/schemas/Tag',
                },
              },
              status: {
                type: 'string',
                description: 'pet status in the store',
                enum: ['available', 'pending', 'sold'],
              },
            },
            description: 'A pet for sale in the pet store',
            example: {
              photoUrls: ['photoUrls', 'photoUrls'],
              name: 'doggie',
              id: 0,
              category: {
                name: 'name',
                id: 6,
              },
              tags: [
                {
                  name: 'name',
                  id: 1,
                },
                {
                  name: 'name',
                  id: 1,
                },
              ],
              status: 'available',
            },
            xml: {
              name: 'Pet',
            },
          },
          ApiResponse: {
            title: 'An uploaded response',
            type: 'object',
            properties: {
              code: {
                type: 'integer',
                format: 'int32',
              },
              type: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
            description: 'Describes the result of uploading an image resource',
            example: {
              code: 0,
              type: 'type',
              message: 'message',
            },
          },
          body: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Updated name of the pet',
              },
              status: {
                type: 'string',
                description: 'Updated status of the pet',
              },
            },
          },
          body_1: {
            type: 'object',
            properties: {
              additionalMetadata: {
                type: 'string',
                description: 'Additional data to pass to server',
              },
              file: {
                type: 'string',
                description: 'file to upload',
                format: 'binary',
              },
            },
          },
        },
        requestBodies: {
          UserArray: {
            description: 'List of user object',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            required: true,
          },
          Pet: {
            description: 'Pet object that needs to be added to the store',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
            required: true,
          },
        },
        securitySchemes: {
          petstore_auth: {
            type: 'oauth2',
            flows: {
              implicit: {
                authorizationUrl: '/api/oauth/dialog',
                scopes: {
                  'write:pets': 'modify pets in your account',
                  'read:pets': 'read your pets',
                },
              },
            },
          },
          api_key: {
            type: 'apiKey',
            name: 'api_key',
            in: 'header',
          },
        },
      },
    };

    expect(
      await generateSDKFromOpenAPI(JSON.stringify(schema), {
        sdkVersion: '1.0.0',
      }),
    ).toMatchSnapshot();
  });

  test('should work with filterStatuses', async () => {
    const schema: OpenAPI = {
      openapi: '3.1.0',
      info: {
        version: '3.1.3',
        title: '@whook/example',
        description: 'A basic Whook server',
      },
      servers: [{ url: 'http://192.168.10.149:8000/v3' }],
      components: {
        parameters: {
          cookie: {
            name: 'cookie',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
        },
        securitySchemes: {
          bearerAuth: {
            description: 'Bearer authentication with a user API token',
            type: 'http',
            scheme: 'bearer',
          },
          fakeAuth: {
            description: 'A fake authentication for development purpose.',
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
      paths: {
        '/ping': {
          get: {
            operationId: 'getPing',
            summary: "Checks API's availability.",
            tags: ['system'],
            parameters: [
              {
                $ref: '#/components/parameters/cookie',
              },
            ],
            responses: {
              '200': {
                description: 'Pong',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        pong: { type: 'string', enum: ['pong'] },
                      },
                    },
                  },
                },
              },
              '400': {
                description: 'Not found',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        pong: { type: 'string', enum: ['pong'] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      tags: [],
    };
    expect(
      await generateSDKFromOpenAPI(
        JSON.stringify(schema),
        {
          sdkVersion: '1.0.0',
          ignoredParametersNames: ['Cookie'],
          undocumentedParametersNames: ['X-Application-Version'],
        },
        {
          filterStatuses: [200, 201, 202, 300],
          generateRealEnums: true,
          exportNamespaces: true,
          tuplesFromFixedArraysLengthLimit: 2,
        },
      ),
    ).toMatchSnapshot();
  });
});
