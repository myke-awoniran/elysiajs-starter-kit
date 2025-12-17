import { t } from 'elysia';

export const deviceHeader = t.Object({
    'x-device-id': t.String({
        required: true,
        description: 'A unique identifier for the user\'s device, for device-specific operations and enhance security.',
        example: '6D92078A-8246-4BA4-AE5B-76104861E7DC'
    })
});
export const refreshTokenHeader = t.Object({
    'x-refresh-token': t.String({
        required: true,
        description: 'Authorization token used to request for new authToken and refreshToken',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
});

export const registrationHeader = t.Object({
    'x-device-id': t.String({
        required: true,
        description: 'A unique identifier for the user\'s device, for device-specific operations and enhance security.',
        example: '6D92078A-8246-4BA4-AE5B-76104861E7DC'
    }),
    'x-registration-token': t.String({
        required: true,
        description: 'Authorization token used to complete the signup process.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
});

export const authTokenHeader = t.Object({
    'x-auth-token': t.String({
        required: true,
        description: 'Authorization token used to authenticate protected endpoints.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
});

export const deviceAndAuthHeader = t.Object({
    'x-auth-token': t.String({
        required: true,
        description: 'Authorization token used to authenticate protected endpoints.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    'x-device-id': t.String({
        required: true,
        description: 'A unique identifier for the user\'s device, for device-specific operations and enhance security.',
        example: '6D92078A-8246-4BA4-AE5B-76104861E7DC'
    })
});

export const deviceAndRefreshHeader = t.Object({
    'x-refresh-token': t.String({
        required: true,
        description: 'Authorization token used to request for new authToken and refreshToken',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    'x-device-id': t.String({
        required: true,
        description: 'A unique identifier for the user\'s device, for device-specific operations and enhance security.',
        example: '6D92078A-8246-4BA4-AE5B-76104861E7DC'
    })
});


// export const deviceAndAuthHeader = t.Intersect([deviceHeader, authTokenHeader]);
// export const deviceAndRefreshHeader = t.Intersect([deviceHeader, refreshTokenHeader]);

export type RefreshTokenHeader = typeof refreshTokenHeader.static;
export type RegistrationHeader = typeof registrationHeader.static;
export type AuthTokenHeader = typeof authTokenHeader.static;
export type DeviceAndAuthHeader = typeof deviceAndAuthHeader.static;
export type DeviceAndRefreshHeader = typeof deviceAndRefreshHeader.static;
export type DeviceHeader = typeof deviceHeader.static;
