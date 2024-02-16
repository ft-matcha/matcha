"use strict";
module.exports = {
    '/profile/update': {
        post: {
            tags: ['profile'],
            summary: '프로필 변경',
            description: '프로필 변경(gender, preference, biography, tag, age, image)',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                gender: {
                                    type: 'string',
                                    description: '성별',
                                    example: 'man',
                                },
                                preference: {
                                    type: 'string',
                                    description: '선호 성별',
                                    example: 'woman',
                                },
                                biography: {
                                    type: 'string',
                                    description: '자기소개',
                                    example: '안녕하세요',
                                },
                                tag: {
                                    type: 'String array',
                                    description: '태그',
                                    example: "['#vegan', '#geek', '#piercing']",
                                },
                                age: {
                                    type: 'number',
                                    description: '나이',
                                    example: 25,
                                },
                                image: {
                                    type: 'String array',
                                    description: '프로필 사진',
                                    example: "['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300']",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: '프로필 변경 성공',
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
                                    profile: {
                                        type: 'object',
                                        description: '프로필 정보',
                                        example: {
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
                    description: '프로필 변경 실패',
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
                                                example: 'Profile already exists',
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
