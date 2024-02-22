export default {
    '/login': {
        post: {
            tags: ['auth'],
            summary: '로그인',
            description: '로그인(email, password)',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                email: {
                                    type: 'string',
                                    description: 'email',
                                    example: 'srdn45@gmail.com',
                                },
                                password: {
                                    type: 'string',
                                    description: 'password',
                                    example: '1523',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: '로그인 성공',
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
                401: {
                    description: '로그인 실패',
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
                                                description: '에러메세지',
                                                example: 'User already exists',
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
