module.exports = {
    '/signup': {
        post: {
            tags: ['auth'],
            summary: '회원가입',
            description: '회원가입(email, firstName, lastName, password)',
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
    },
};
