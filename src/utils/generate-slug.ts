// generate a function that creates a slug from a string without accents, symbols or spaces
export function generateSlug(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-/, '')
        .replace(/-$/, '')
        .toLowerCase()
}
