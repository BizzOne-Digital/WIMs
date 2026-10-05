// Pure helper, safe for client and server bundles.
// Legacy disk uploads (/uploads/...) never survive a serverless deploy, so they fall back to the default image.
export const resolveImage = (url: string | undefined, fallback: string) => (!url || url.startsWith('/uploads/') ? fallback : url)
