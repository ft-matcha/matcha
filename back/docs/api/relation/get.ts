export default {
    '/friend': {
        get: {
            tags: ['relation'],
            summary: '친구 조회',
            description: '친구 조회',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: '친구 조회 성공',
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
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                email: {
                                                    type: 'string',
                                                    description: '이메일',
                                                    example: '',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: '친구 조회 실패',
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
                                        properties: {
                                            message: {
                                                type: 'string',
                                                description: '에러 메시지',
                                                example: '친구 조회 실패',
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
    },
};
