/**
 * Utility functions for string manipulation
 */

/**
 * Convert Vietnamese text to URL-friendly slug
 * @param text - Input text to convert
 * @returns URL-friendly slug
 */
export function createSlug(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    // Replace Vietnamese characters
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    // Replace spaces and special characters with hyphens
    .replace(/[\s\-_]+/g, '-')
    // Remove all non-alphanumeric characters except hyphens
    .replace(/[^a-z0-9\-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/\-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^\-+|\-+$/g, '');
}

/**
 * Generate unique slug by appending number if needed
 * @param baseSlug - Base slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
