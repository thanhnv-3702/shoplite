export const DEMO_USER = {
  id: "user-thanhg",
  name: "Thanh",
  email: "thanhg@shoplite.com",
  password: "shoplite123",
} as const;

export function findDemoUser(email: string, password: string) {
  if (
    email.toLowerCase() === DEMO_USER.email &&
    password === DEMO_USER.password
  ) {
    return {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
    };
  }
  return null;
}
