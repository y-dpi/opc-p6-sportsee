// Used when the backend does not return a valid profile picture.
export const FALLBACK_PHOTO = 'https://thesportsedit.com/cdn/shop/files/carbon_plated_running_shoes_CL_645x900_crop_center.jpg?v=5545842323198498418';

// Format ISO date to '1 janvier 2000'.
export function formatDate(isoDate) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}

// Format height to '1m68'.
export function formatHeight(cm) {
  return `${Math.floor(cm / 100)}m${String(cm % 100).padStart(2, '0')}`;
}

// Format duration to { value: '27h', unit: '15min' }.
export function formatDuration(minutes) {
  return { value: `${Math.floor(minutes / 60)}h`, unit: `${minutes % 60}min` };
}

// Format sex to 'Homme'/'Femme'/null.
export function formatSex(sex) {
  return (sex === 'male')
    ? 'Homme'
    : ((sex === 'female')
      ? 'Femme'
      : null);
}