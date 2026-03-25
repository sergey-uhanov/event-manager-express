export function formatZodErrors(issues) {
    return issues.map(issue => ( {
        field: issue.path[issue.path.length - 1],
        message: issue.message,
        code: issue.code,
    }));
}