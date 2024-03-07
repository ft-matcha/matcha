export default {
    '/friend/request': {
        post: {
            tags: ['relation'],
            summary: '친구 요청',
            description: '친구 요청',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                email: {
                                    type: 'string',
                                    description: '이메일',
                                    example: 'srdn45@gmail.com',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '친구 요청 성공',
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
                    description: '친구 요청 실패',
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
                                        example: '친구 요청 실패',
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
