const AUTH_KEY = "kakeylka_auth";
const ADMIN_PASSWORD = "123456";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    try {
      localStorage.setItem(AUTH_KEY, "1");
    } catch {}
    return true;
  }
  return false;
}

export function logout(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {}
}

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}
