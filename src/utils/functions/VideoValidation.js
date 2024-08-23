export function isValidMediaUrl(url) {
    try {
        const parsedUrl = new URL(url);
        
        // Check if the hostname contains 'res.cloudinary.com'
        return parsedUrl.hostname === 'res.cloudinary.com';
    } catch (e) {
        // If URL constructor throws an error, the URL is not valid
        return false;
    }
}
