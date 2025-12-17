import { t } from 'elysia';

export const basePaginationQuerySchema = t.Object({
    limit: t.Optional(t.Number({
        minimum: 1,
        maximum: 100,
        description: 'Number of items per page (1-100)',
        example: 20
    })),
    afterCursor: t.Optional(t.String({
        description: 'Cursor for pagination - get items after this cursor',
        example: 'cHJldl9fX0Nyb3VjaA=='
    })),
    beforeCursor: t.Optional(t.String({
        description: 'Cursor for pagination - get items before this cursor',
        example: 'bmV4dF9fX0R1bWJsZWRvcmU='
    }))
});

export const extendedQueryParamsSchema = t.Object({
    q: t.Optional(t.String({
        description: 'Query string for general search'
    })),

    page: t.Optional(t.Numeric({
        description: 'Page number for offset-based pagination'
    })),

    limit: t.Optional(t.Numeric({
        description: 'Number of items per page'
    })),

    beforeCursor: t.Optional(t.String({
        description: 'Cursor for pagination - get items before this cursor'
    })),

    afterCursor: t.Optional(t.String({
        description: 'Cursor for pagination - get items after this cursor'
    })),


    search: t.Optional(t.String({
        description: 'Search term for specific search functionality'
    })),


    cursor: t.Optional(t.String({
        description: 'General cursor for pagination',
        example: 'cHJldl9fX0Nyb3VjaA=='
    })),
});

export type BasePaginationQuery = typeof basePaginationQuerySchema.static;
export type QueryParams = typeof extendedQueryParamsSchema.static; 