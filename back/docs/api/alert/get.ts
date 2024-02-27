export default {
    '/alert/get': {
        get: {
            tags: ['alert'],
            summary: 'Get alert',
            description: 'Get alert',
            operationId: 'getAlert',
            security: [
                {
                    bearerAuth: [],
                },
            ],

            parameters: [
                {
                    name: 'status',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                    },
                                    data: {
                                        type: 'object',
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                    },
                                    error: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
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
