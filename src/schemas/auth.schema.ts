import {t} from 'elysia';
import {userSchema} from './user.schema';

export const requestSignUpOtpSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email address',
        description: 'Email address to send the signup OTP to.',
        example: 'email@xyx.com'
    })
});

export const checkEmailSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email address',
        description: 'Email address to check for availability.',
        example: 'Optimus@turningauto.app'
    })
});

export const verifySignUpOtpSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email address',
        description: 'Email address used during signup.',
        example: 'email@xyz.com'
    }),
    otp: t.String({
        description: 'One-time password sent to the user’s email.',
        error: 'OTP must be a valid 6 length string',
        maxLength: 6,
        minLength: 6,
        example: '123456'
    })
});

export const onboardUserSchema = t.Object({
    firstName: t.String({
        error: 'Provide valid string',
        description: 'Your legal name',
        example: 'Prime'
    }),

    fcmToken: t.Optional(t.String({
        error: 'fcm token must be a valid string',
        description: 'Firebase messaging token',
        example: 'Prime'
    })),

    lastName: t.String({
        error: 'Provide valid string',
        description: 'Your legal name',
        example: 'Optimus'
    }),

    passcode: t.String({
        description: '6-digit passcode set by the user.',
        error: 'Passcode must be a valid 6 length string',
        example: '432112',
        minLength: 6,
        maxLength: 6
    }),

    username: t.String({
        description: 'Username chosen by the user.',
        minLength: 4,
        maxLength: 50,
        example: 'john_doe'
    })
});

export const signInSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email address',
        description: 'Email address used for signing in.',
        example: 'Optimus@turningauto.app'
    }),

    passcode: t.String({
        description: 'Account password.',
        error: 'Passcode must be a valid 6 length string',
        example: '283942',
        minLength: 6,
        maxLength: 6
    }),

    fcmToken: t.Optional(t.String({
        error: 'fcm token must be a valid string',
        description: 'Firebase messaging token'
    }))
});

export const accessTokenSchema = t.Object({
    accessToken: t.String({
        description: 'JWT access token used for authenticating API requests.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
});

export const refreshTokenSchema = t.Object({
    refreshToken: t.String({
        description: 'JWT refresh token used to obtain a new access token.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
});

//responses
export const checkEmailResponseSchema = t.Object({
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
        isRegistered: t.Boolean({
            description: 'boolean that shows if an account exists with the provided email',
            example: false
        }),
        email: t.String({
            description: 'The provided email address',
            example: 'Optimus@turningauto.app'
        })
    }))
});

export const defaultBadRequestResponseSchema = t.Object({
    success: t.Boolean({
        description: 'Boolean field to make decision on the client, it\'s false for this status code(400)',
        example: false
    }),
    status: t.Number({
        description: 'The HTTP status code of error ',
        example: 400
    }),

    message: t.String({
        description: 'A human-readable error message',
        example: 'Invalid input data'
    }),

    errorCode: t.String({
        description: 'Turning internal error code to handle certain error efficiently on the client side',
        example: 'TN_VAL_300'
    }),

    errors: t.Optional(
        t.Record(
            t.String(),
            t.String({
                description: 'A description of the validation error for the field',
                example: 'Email must be a valid email address'
            })
        )
    )
});

export const defaultSuccessResponseSchema = t.Object({
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
    })
});

export const onboardUserResponseSchema = t.Object({

    status: t.Number({
        description: 'Response HTTP status code',
        example: 201
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
            user: userSchema,
            accessToken: t.String({
                description: 'JWT access token used for authenticating API requests.',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }),
            refreshToken: t.String({
                description: 'JWT refresh token used to obtain a new access token.',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            })
        })
    )
});

export const refreshTokenResponseSchema = t.Object({
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
            accessToken: t.String({
                description: 'JWT access token used for authenticating API requests.',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }),
            refreshToken: t.String({
                description: 'JWT refresh token used to obtain a new access token.',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            })
        })
    )
});

export const updatePasswordResponseSchema = t.Object({
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
            confirmationToken: t.String({
                description: ' access token the client will send as headers to complete the process',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            })
        })
    )
});

export const verifyRegistrationOtpSchema = t.Object({
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
            authToken: t.String({
                description: ' access token the client will send as headers to complete the process',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            })
        })
    )
});

export type CheckEmail = typeof checkEmailSchema.static;
export type RequestSignUpOtp = typeof requestSignUpOtpSchema.static;
export type VerifySignUpOtp = typeof verifySignUpOtpSchema.static;
export type OnboardUser = typeof onboardUserSchema.static;
export type SignIn = typeof signInSchema.static;
export type DefaultSuccessResponse = typeof defaultSuccessResponseSchema.static;




