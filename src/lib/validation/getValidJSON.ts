export function getValidJSON<T>(str: string) {
  try {
    const value = JSON.parse(str) as T;

    const result = { valid: true, value, error: null };

    return result;
  } catch (error) {
    const result = { valid: false, value: null, error };

    return result;
  }
}
