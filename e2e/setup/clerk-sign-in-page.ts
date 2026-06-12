/** Path that loads Clerk before `clerk.signIn()` — uses locale-aware sign-in URL from env. */
export function clerkSignInPagePath(): string {
  const configured = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL?.trim();
  if (configured) {
    return configured.startsWith("/") ? configured : `/${configured}`;
  }
  return "/sign-in";
}
