export default {
    '/recommend': {
        get: {
            tags: ['user'],
            summary: 'Get recommend user info',
            description: 'Get recommend user info',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'tag',
                    schema: {
                        type: 'string',
                    },
                    description: '추천 태그',
                },
            ],
            responses: {
                200: {
                    description: 'Get user info success',
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
                                    user: {
                                        type: 'object',
                                        description: '유저 정보',
                                        example: [
                                            {
                                                id: 'srdn45',
                                                email: 'srdn45@gmail.com',
                                                firstName: 'Lee',
                                                lastName: 'eunryong',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Get user info fail',
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
                                            message: 'Get recommend user info fail',
                                        },
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
