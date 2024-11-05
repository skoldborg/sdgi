import { getSession } from '@auth0/nextjs-auth0/edge';
import * as prismic from '@prismicio/client';
import { NextRequest, NextResponse } from 'next/server';

const getSupportedLocales = async () => {
  const client = prismic.createClient('sdgi', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  const repository = await client.getRepository();
  return repository.languages.map((lang) => lang.id); // Maps language IDs, eg 'en-gb', 'fr-fr'
};

// Define default locale
const DEFAULT_LOCALE = 'en-gb';

export async function middleware(req: NextRequest) {
  const user = await getSession(req, NextResponse.next());
  const { pathname } = req.nextUrl;

  // Fetch supported locales from Prismic using @prismicio/client
  const supportedLocales = await getSupportedLocales();

  const userLocaleByCookie = req.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    userLocaleByCookie && supportedLocales.includes(userLocaleByCookie)
      ? userLocaleByCookie
      : DEFAULT_LOCALE;

  // Extract the locale from the pathname
  const pathLocale = pathname.split('/')[1];

  // Handle redirection if no locale is present in the root path
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Validate the locale against Prismic-supported locales
  if (!supportedLocales.includes(pathLocale)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // If user is logged in and visits /:locale, redirect to /:locale/tool/assessments
  if (user && pathname === `/${pathLocale}`) {
    return NextResponse.redirect(
      new URL(`/${pathLocale}/tool/assessments`, req.url),
    );
  }

  // Protect the tool routes with Auth0 authentication
  if (pathname.startsWith(`/${pathLocale}/tool/`)) {
    if (!user) {
      return NextResponse.redirect(new URL(`/${pathLocale}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|services|_next|static|public|favicon.ico|images).*)'],
};
