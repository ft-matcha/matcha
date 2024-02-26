export default {
    '/friend/accept': {
        get: {
            tags: ['relation'],
            summary: '요청 수락',
            description: '요청 수락',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'email',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: '요청 수락할 유저 email',
                },
            ],
            responses: {
                200: {
                    description: '요청 수락 성공',
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
                    description: '요청 수락 실패',
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
                                                example: '요청 수락 실패',
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
