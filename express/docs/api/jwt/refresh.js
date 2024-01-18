module.exports = {
    '/refresh': {
        get: {
            tags: ['JWT'],
            summary: '토큰 재발급',
            description: '토큰 재발급',
            headers: {
                Authorization: {
                    description: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
            },
            responses: {
                200: {
                    description: '토큰 재발급 성공',
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
                                    accessToken: {
                                        type: 'string',
                                        description: 'accessToken',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                    },
                                    refreshToken: {
                                        type: 'string',
                                        description: 'refreshToken',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '토큰 재발급 실패',
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
                                        description: '에러 메시지',
                                        example: '토큰이 만료되었습니다.',
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
