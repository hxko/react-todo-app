// src/components/Auth/LoginForm.types.ts

export interface LoginPageProps {
  // Optional: callback after successful login (for redirect, etc.)
  onLoginSuccess?: () => void;

  // Optional: override loading state externally
  isLoading?: boolean;
}
