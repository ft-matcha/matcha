export default {
    '/hate': {
        post: {
            tags: ['relation'],
            summary: '싫어요',
            description: '싫어요',
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
                                id: {
                                    type: 'string',
                                    description: 'id',
                                    example: 'id value',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '싫어요 성공',
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
                    description: '싫어요 실패',
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
                                                example: '싫어요 실패',
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
