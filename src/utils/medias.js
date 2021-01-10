export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (url.startsWith('/')) {
    // Prepend Strapi address
    const strapiUrl = process.env.GRIDSOME_STRAPI_URL || 'http://localhost:1337'
    return strapiUrl + url
  }
  // Otherwise return full URL
  return url
}

/**
 * Image transformation
 * w_300,h_300,c_crop,g_face,r_max/w_100/
 */
export function getSmallImageUrl(image) {
  if (image.provider_metadata) {
    const imageUrl = process.env.GRIDSOME_CLOUDINARY_BASE_URL;
    return imageUrl + "/w_300,h_300,c_crop,g_face,r_max/w_100/" + image.provider_metadata.public_id + image.ext;
  }
  return image.url;
}

/**
 * Image transformation
 * w_300,h_300,c_crop,g_face,r_max/w_200/
 */
export function getMediumImageUrl(image) {
  if (image.provider_metadata) {
    const imageUrl = process.env.GRIDSOME_CLOUDINARY_BASE_URL;
    return imageUrl + "/w_300,h_300,c_crop,g_face,r_max/w_200/" + image.provider_metadata.public_id + image.ext;
  }
  return image.url;
}

export default {getStrapiMedia}
