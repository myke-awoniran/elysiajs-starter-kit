import { t } from 'elysia';

export const userSchema = t.Object({
    avatar: t.String({
        required: false,
        description: 'user avatar',
        example: 'https://res.cloudinary.com/dnmjjbxhe/image/upload/v1749339644/Turning9-2_d9nxdp.png'
    }),

    firstName: t.String({
        description: 'user\'s registered first name',
        example: 'Optimus '
    }),

    lastName: t.String({
        description: 'user\'s registered last name',
        example: 'Prime'
    }),

    username: t.String({
        description: 'username on turning',
        example: 'cybertron'
    }),

    email: t.String({
        format: 'email',
        description: 'user\'s email on turning',
        example: 'optimus@turningauto.app'
    }),

    settings: t.Object({
        allowNotification: t.Boolean({
            description: 'user notification preference'
        })
    }),

    id: t.String({
        description: 'user\'s registered id',
        format: 'uuid',
        example: '9f0c23d8-4a91-44f6-9f9c-8ed4761d672e'
    })
});

export const notFoundErrorSchema = t.Object({
    success: t.Boolean({
        description: 'Boolean field to make decision on the client, it\'s false for this status code(400)',
        example: false
    }),
    status: t.Number({
        description: 'The HTTP status code of error ',
        example: 404
    }),

    message: t.String({
        description: 'A human-readable error message',
        example: 'Not found'
    }),

    errorCode: t.String({
        description: 'Turning internal error code to handle certain error efficiently on the client side',
        example: 'TN_RES_400'
    })
});

export const userProfileResponseSchema = t.Object({
    status: t.Number({
        description: 'Response HTTP status code',
        example: 200
    }),
    success: t.Boolean({
        description: 'A boolean to handle success response effectively on the client side',
        example: true
    }),
    message: t.String({
        description: 'Message',
        example: 'success'
    }),
    data: t.Optional(t.Object({
            user: userSchema
        })
    )
});

export const editUserSchema = t.Object({
    avatar: t.Optional(
        t.String({
            description: 'user avatar',
            example: 'https://res.cloudinary.com/dnmjjbxhe/image/upload/v1749339644/Turning9-2_d9nxdp.png'
        })
    ),

    firstName: t.Optional(
        t.String({
            description: 'user\'s registered first name',
            example: 'Optimus'
        })
    ),

    username: t.Optional(
        t.String({
            description: 'username on turning',
            example: 'turning/cybertron',
            minLength: 3,
            maxLength: 30
        })
    ),

    bio: t.Optional(
        t.String({
            description: 'user bio',
            example: 'I am a car enthusiast',
            minLength: 10,
            maxLength: 160
        })
    ),

    coverPhoto: t.Optional(
        t.String({
            format: 'uri',
            description: 'user cover photo',
            example: 'https://res.cloudinary.com/dnmjjbxhe/image/upload/v1749339644/Turning9-2_d9nxdp.png'
        })
    ),

    settings: t.Optional(
        t.Object({
            allowNotification: t.Boolean({
                description: 'user notification preference'
            })
        })
    )
});

export const userPreferenceSchema = t.Object({
    interests: t.Optional(
        t.Array(t.String({
            description: 'user interest',
            example: 'Electric Vehicles'
        }))
    ),

    activities: t.Optional(
        t.Array(t.String({
            description: 'user activity',
            example: 'Racing'
        }))
    ),

    experienceLevels: t.Optional(
        t.Array(t.String({
            description: 'user experience level',
            example: 'Beginner'
        }))
    ),

    contentPreferences: t.Optional(
        t.Array(t.String({
            description: 'user content preference',
            example: 'Cars'
        }))
    ),

    automobileTypes: t.Optional(
        t.Array(t.String({
            description: 'user automobile type',
            example: 'SUV'
        }))
    )

});

export const editUserProfileSchema = t.Omit(userSchema, ['email', 'id']);

export type UserDto = typeof userSchema.static;

export type EditUser = typeof editUserSchema.static;

export type UserPreference = typeof userPreferenceSchema.static;