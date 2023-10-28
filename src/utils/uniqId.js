export function generateUniqueId() {
  const randomValue = Math.random().toString(36).substr(2, 5); // Generates a random 5-character string
  return randomValue;
}
