export function formatDate(value, pattern) {
  const date = new Date(value).toISOString().split('T')[0];

  if (pattern === 'ymd') {
    return date
  } else {
    return date.split('-').reverse().join('/');
  }
}
