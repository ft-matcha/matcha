export default {
    '/register': {
        get: {
            tags: ['user'],
            summary: 'Check user email exist',
            description: 'Check user email exist',
            parameters: [
                {
                    in: 'query',
                    name: 'email',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: '유저 이메일',
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
