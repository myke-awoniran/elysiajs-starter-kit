export const config = {
    jwtPrivateKey: <string>process.env.JWT_ENCRYPTION_KEY,

    postgres: {
        credentials: {
            uri: <string>process.env.PG_URI,
            host: <string>process.env.DB_HOST,
            user: <string>process.env.DB_USERNAME,
            password: <string>process.env.DB_PASSWORD,
            name: <string>process.env.DB_NAME,
            port: process.env.DB_PORT as unknown as number
        },

        tables: {
            userVerifications: 'user_verifications',
            users: 'users',
            userAuthTokens: 'user_auth_tokens',
            userAuths: 'user_auths',
            userSettings: 'user_settings',
            // Add your other tables her - Myke
        }
    },

    firebase: {
        privateKey: <string>process.env.FIREBASE_PRIVATE_KEY,
        privateKeyId: <string>process.env.FIREBASE_PRIVATE_KEY_ID,
        clientEmail: <string>process.env.FIREBASE_CLIENT_EMAIL,
        clientId: <string>process.env.FIREBASE_CLIENT_ID,
        clientX509CertUrl: <string>process.env.FIREBASE_CLIENT_X509_CERT_URL
    },

    google: {
        clientID: <string>process.env.GOOGLE_CLIENT_ID
    },

    redis: {
        uri: <string>process.env.REDIS_URI_WITH_AUTH
    },

    aws: {
        secretAccessKey: <string>process.env.AWS_SECRET_KEY,
        accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
        region: <string>process.env.AWS_REGION,
        s3BucketName: <string>process.env.AWS_S3_BUCKET
    },

    others: {
        cursorSecretKey: <string>process.env.CURSOR_PAGINATION_KEY
    },

    environment: <string>process.env.NODE_ENV,

    port: process.env.PORT as unknown as number,

    timeZone: process.env.SERVER_TIME_ZONE as unknown as string,

    emailOctopusCredentials: {
        listId: <string>process.env.EMAIL_OCTOPUS_LIST_ID,
        apiKey: <string>process.env.EMAIL_OCTOPUS_API_KEY,
        newsLetterListId: <string>process.env.EMAIL_OCTOPUS_NEWSLETTER_LIST_ID
    },

    smtpCredentials: {
        emailFrom: <string>process.env.EMAIL_FROM,
        host: <string>process.env.EMAIL_HOST,
        username: <string>process.env.EMAIL_SMTP_USERNAME,
        password: <string>process.env.EMAIL_SMTP_PASSWORD,
        port: <string>process.env.EMAIL_PORT
    },

    smtpExpress: {
        projectId: <string>process.env.SMTP_EXPRESS_PROJECT_ID,
        projectSecret: <string>process.env.SMTP_EXPRESS_PROJECT_SECRET
    },

    axiom: {
        token: <string>process.env.AXIOM_TOKEN,
        dataSet: <string>process.env.AXIOM_DATASET
    },

    apple: {
        clientID: <string>process.env.APPLE_CIENT_ID,
        redirectURI: <string>process.env.APPLE_REDIRECT_URL,
        keyID: <string>process.env.APPLE_KEY_ID,
        teamID: <string>process.env.APPLE_TEAM_ID
    },

    openWeatherApp: {
        appId: <string>process.env.OPEN_WEATHER_API_KEY
    },

    mapBox: {
        accessToken: <string>process.env.MAPBOX_ACCESS_TOKEN
    }

};