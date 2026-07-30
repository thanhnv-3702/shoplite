export function identity<T>(value: T): T {
  return value;
}

export function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
