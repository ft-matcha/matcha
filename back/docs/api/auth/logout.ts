export default {
    '/logout': {
        get: {
            tags: ['auth'],
            summary: '로그아웃',
            description: '로그아웃',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: '로그아웃 성공',
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
                401: {
                    description: '로그아웃 실패',
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
                                            message: 'User not found',
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
