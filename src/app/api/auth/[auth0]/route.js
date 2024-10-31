import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin(async (req) => {
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang');

    return {
      returnTo: `/${lang}/tool/assessments`,
    };
  }),
  signup: handleLogin((req) => {
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang');

    return {
      returnTo: `/${lang}/tool/assessments`,
    };
  }),
});
