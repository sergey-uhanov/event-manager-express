

export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!result.success) {
            return next(result.error)
        }

        // result.data.body && (req.body = result.data.body)
        // result.data.query && (req.query = result.data.query)
        // result.data.params && (req.params = result.data.params)

        next();
    };
}