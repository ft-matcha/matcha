export default {
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
                                phone: {
                                    type: 'string',
                                    description: 'phone',
                                    example: '010-1234-5678',
                                },
                                address: {
                                    type: 'string',
                                    description: 'address',
                                    example: '서울시 강남구',
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
