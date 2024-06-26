export default {
    '/register': {
        post: {
            tags: ['auth'],
            summary: '회원가입',
            description: '회원가입(email, firstName, lastName, password)',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                uid: {
                                    type: 'string',
                                    description: 'uid',
                                    example: 'srdn45',
                                },
                                email: {
                                    type: 'string',
                                    description: 'email',
                                    example: 'srdn45@gmail.com',
                                },
                                firstName: {
                                    type: 'string',
                                    description: 'firstName',
                                    example: 'Lee',
                                },
                                lastName: {
                                    type: 'string',
                                    description: 'lastName',
                                    example: 'eunryong',
                                },
                                password: {
                                    type: 'string',
                                    description: 'password',
                                    example: '1523',
                                },
                                gender: {
                                    type: 'string',
                                    description: 'phone',
                                    example: 'man',
                                },
                                address: {
                                    type: 'object',
                                    description: 'address',
                                    example: {},
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: '회원가입 성공',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        description: '성공여부',
                                        example: true,
                                    },
                                    body: {
                                        type: 'object',
                                        description: '회원정보',
                                        example: {
                                            accessToken: 'JWT',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                409: {
                    description: '회원가입 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        description: '성공여부',
                                        example: false,
                                    },
                                    error: {
                                        type: 'object',
                                        description: '에러',
                                        example: {
                                            message: '에러메시지',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        get: {
            tags: ['user'],
            summary: 'Check user id, email exist',
            description: 'Check user id, email exist',
            parameters: [
                {
                    in: 'query',
                    name: 'email',
                    schema: {
                        type: 'string',
                    },
                    description: 'email',
                },
                {
                    in: 'query',
                    name: 'uid',
                    schema: {
                        type: 'string',
                    },
                    description: 'id',
                },
            ],
            responses: {
                200: {
                    description: 'email not exist',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        description: '성공여부',
                                        example: true,
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Check user email fail',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        description: '성공여부',
                                        example: false,
                                    },
                                    message: {
                                        type: 'string',
                                        description: '메시지',
                                        example: 'email already exist',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
