import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/tool/assessments',
  }),
  signup: handleLogin({
    returnTo: '/tool/assessments',
  }),
});
