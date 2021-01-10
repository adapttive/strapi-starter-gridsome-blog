export function getUrl (slug, type) {
  let prefix = type
  if (type === 'blog-category') {
    prefix = 'blog/category'
  } else if (type === 'blog-tag') {
    prefix = 'blog/tag'
  }
  return prefix + '/' + slug
}
