module.exports = {
    '/user': {
        get: {
            tag: ['user'],
            summary: 'Get user info',
            description: 'Get user info',
            responses: {
                200: {
                    description: 'Get user info success',
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
                                    user: {
                                        type: 'object',
                                        description: '유저 정보',
                                        example: {
                                            id: 'srdn45',
                                            email: 'srdn45@gmail.com',
                                            firstName: 'Lee',
                                            lastName: 'eunryong',
                                            profile: { 'profile info': 'profile info' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Get user info fail',
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
                                            message: 'Profile not found',
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
