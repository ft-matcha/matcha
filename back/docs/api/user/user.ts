export default {
    '/user': {
        get: {
            tags: ['user'],
            summary: 'Get user info',
            description: 'Get user info',
            security: [
                {
                    bearerAuth: [],
                },
            ],
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
        put: {
            tags: ['user'],
            summary: '프로필 및 유저 정보 변경',
            description:
                '프로필 변경(email, password, firstName, lastName, phone, address, status, gender, preferences, biography, tag, age, image, viewList)',
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
                                password: {
                                    type: 'string',
                                    description: '비밀번호',
                                    example: '1523',
                                },
                                firstName: {
                                    type: 'string',
                                    description: '이름',
                                    example: 'Lee',
                                },
                                lastName: {
                                    type: 'string',
                                    description: '성',
                                    example: 'eunryong',
                                },
                                phone: {
                                    type: 'string',
                                    description: '전화번호',
                                    example: '010-1234-5678',
                                },
                                address: {
                                    type: 'string',
                                    description: '주소',
                                    example: { location: '서울시 강남구' },
                                },
                                gender: {
                                    type: 'string',
                                    description: '성별',
                                    example: 'man',
                                },
                                preferences: {
                                    type: 'string array',
                                    description: '선호 성별',
                                    example: ['woman'],
                                },
                                biography: {
                                    type: 'string',
                                    description: '자기소개',
                                    example: '안녕하세요',
                                },
                                tag: {
                                    type: 'String array',
                                    description: '태그',
                                    example: ['#vegan', '#geek', '#piercing'],
                                },
                                age: {
                                    type: 'number',
                                    description: '나이',
                                    example: 25,
                                },
                                image: {
                                    type: 'String array',
                                    description: '프로필 사진',
                                    example: [
                                        'https://picsum.photos/200/300',
                                        'https://picsum.photos/200/300',
                                        'https://picsum.photos/200/300',
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: '프로필 및 유저정보 변경 성공',
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
                                        type: 'object',
                                        description: '프로필 정보',
                                        example: {
                                            email: 'srdn45@gmail.com',
                                            firstName: 'Lee',
                                            lastName: 'eunryong',
                                            address: '서울시 강남구',
                                            phone: '010-1234-5678',
                                            status: 'Active',
                                            gender: 'man',
                                            preference: 'woman',
                                            biography: '안녕하세요',
                                            tag: "['#vegan', '#geek', '#piercing']",
                                            age: 25,
                                            image: "['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300']",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '프로필 및 유저정보 변경 실패',
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
                                                example: '프로필 및 유저정보 변경 실패 : 서버 에러',
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
