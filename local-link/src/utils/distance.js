/**
 * Calculates the straight-line geographic distance between two coordinates
 * on Earth using the Haversine formula.
 *
 * @param {number|string} lat1 - Receiver Latitude
 * @param {number|string} lon1 - Receiver Longitude
 * @param {number|string} lat2 - Provider Latitude
 * @param {number|string} lon2 - Provider Longitude
 * @returns {number|null} Distance in kilometers, or null if coordinates are invalid
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Validate that all coordinates are provided
  if (
    lat1 === null ||
    lat1 === undefined ||
    lon1 === null ||
    lon1 === undefined ||
    lat2 === null ||
    lat2 === undefined ||
    lon2 === null ||
    lon2 === undefined
  ) {
    return null;
  }

  const numLat1 = Number(lat1);
  const numLon1 = Number(lon1);
  const numLat2 = Number(lat2);
  const numLon2 = Number(lon2);

  // Validate that converted values are valid numbers
  if (
    isNaN(numLat1) ||
    isNaN(numLon1) ||
    isNaN(numLat2) ||
    isNaN(numLon2)
  ) {
    return null;
  }

  // Earth's approximate radius in kilometers
  const R = 6371;

  // Convert coordinate differences from degrees to radians
  const dLat = ((numLat2 - numLat1) * Math.PI) / 180;
  const dLon = ((numLon2 - numLon1) * Math.PI) / 180;

  // Convert latitudes to radians
  const radLat1 = (numLat1 * Math.PI) / 180;
  const radLat2 = (numLat2 * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Straight-line distance in kilometers
  const distance = R * c;

  return distance;
};
