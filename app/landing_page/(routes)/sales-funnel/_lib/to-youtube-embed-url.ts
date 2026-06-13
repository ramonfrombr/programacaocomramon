/**
 * Normalizes YouTube watch, youtu.be, and embed URLs to embed form.
 */
export function toYoutubeEmbedUrl(url: string): string {
    const trimmed = url.trim();

    const watchMatch = trimmed.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );

    if (watchMatch?.[1]) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    return trimmed;
}
