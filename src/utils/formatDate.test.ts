import { formatToLocal } from './formatDate';

describe('formatToLocal', () => {
  test('formats ISO date string to local date-time', () => {
    const isoDate = '2023-12-01T10:15:30Z';
    const formattedDate = formatToLocal(isoDate);

    // Adjust the expected format based on your locale settings
    const expectedDate = new Date(isoDate).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    expect(formattedDate).toBe(expectedDate);
  });

  test('handles invalid ISO date string gracefully', () => {
    const invalidIsoDate = 'invalid-date';
    const formattedDate = formatToLocal(invalidIsoDate);
    expect(formattedDate).toBe('Invalid Date');
  });
});
