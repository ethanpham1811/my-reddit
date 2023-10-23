# My Reddit Clone Web App

![My Reddit](public/readme/readme.jpg)

## Getting Started

Install dependencies:

```bash
npm
# or
yarn
```

Dev run:

```bash
npm run dev
# or
yarn dev
```

Build & Prod run:

```bash
npm run build
# or
yarn build

npm run start
# or
yarn start
```

Navigate [http://localhost:3000](http://localhost:3000) (Both Dev & Prod)

# NextJs + MUI + GraphQL

## Overview

> This project provides full-stack source code with [NextJS 13](https://nextjs.org/docs)
> Core FE framework [ReactJS 18](https://react.dev/learn)
> Production is deployed on [Vercel](https://vercel.com/)

## Technical recap

> All pages are server side rendered & prefetched with [ISG](https://vercel.com/docs/incremental-static-regeneration)
> Data fetching, cache and optimistic update with [Apollo v3](https://www.apollographql.com/docs/react/)
> GraphQL schemas & api built with [Stepzen](https://stepzen.com/)
> PostgreSQL db & storage are hosted on [Supabase](https://supabase.com/)
> 99% [MaterialUI_v5] customized component(https://mui.com/material-ui/getting-started/)
> NextJS [Page router](https://nextjs.org/docs/pages)

## Run development server

## Environments & configuration

Currently only one dev environment

## Typescript & linting

### Compile typescript

> Typescript validation won't be triggered on dev mode, please build before pushing to repository.

```bash
npm run build
# or
yarn build
```

### Linting

> Add this comment on top of the next line you want ignore eslint just in case
> `// eslint-disable-next-line <lint>`

```bash
npm run lint
# or
yarn lint
```

## .env

Keys need that is used to access the `.env` variables in runtime:

### private (server only)

1. **NEXTAUTH_SECRET** : Nextjs Auth secret (for Authentication - currently unused)
2. **NEXTAUTH_URL** : Nextjs Auth url (for Authentication - currently unused) [http://localhost:3000]

### Public (exposed to client)

1. **NEXT_PUBLIC_STEPZEN_HOST** : Stepzen qraphQL api end point
2. **NEXT_PUBLIC_STEPZEN_API_KEY** : Stepzen api key [**::stepzen.io+1000::**]
3. **NEXT_PUBLIC_SUPABASE_URL** : Supabase host [db.**.supabase.co]
4. **NEXT_PUBLIC_SUPABASE_ANON_KEY** : Supabase anon key
5. **NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET_URL** : Supabase storage endpoint
6. **NEXT_PUBLIC_TINY_MCE_API_KEY** : Rich text editor api key

## Crossbrowsers support

> The browser version must at least match the below chart or above for the `animation` & `fallback` to work properly

|         |     |
| ------- | --: |
| Chrome  |  20 |
| Firefox |  28 |
| Safari  | 6.1 |
| Edge    |  12 |
| IE      |  11 |
| Opera   |  12 |

## Packages & Dependencies

### Global dependencies

|                                                      |         |
| ---------------------------------------------------- | ------- |
| [Node](https://nodejs.org/)                          | 16.16.0 |
| [Yarn](https://yarnpkg.com/)                         | 1.12.19 |
| [Supabase cli](https://supabase.com/docs/guides/cli) | 0.0.21  |
| [Stepzen](https://github.com/stepzen-dev)            | 0.33.0  |

### Dependencies

|                               |         |
| ----------------------------- | ------: |
| @apollo/client                |   3.8.3 |
| @emotion/react                | 11.11.1 |
| @mui/material                 | 5.14.10 |
| @supabase/auth-helpers-nextjs |   0.8.1 |
| @supabase/auth-helpers-react  |   0.4.2 |
| @supabase/supabase-js         |  2.37.0 |
| @tinymce/tinymce-react        |   4.3.0 |
| bcrypt                        |   5.1.1 |
| csstype                       |   3.1.2 |
| date-fns                      |  2.30.0 |
| eslint                        |  8.49.0 |
| graphql                       |  16.8.0 |
| lodash                        | 4.17.21 |
| next                          |  13.5.4 |
| next-auth                     |  4.23.1 |
| random-avatar-generator       |   2.0.0 |
| react                         |  18.2.0 |
| react-hook-form               |  7.46.1 |
| react-hot-toast               |   2.4.1 |
| react-html-parser             |   2.0.2 |
| typescript                    |   5.2.2 |
| unique-names-generator        |   4.7.1 |
| uuid                          |   9.0.1 |

### Dev dependencies

|                         |        |
| ----------------------- | -----: |
| types/bcrypt            |  5.0.0 |
| types/lodash            | 4.14.1 |
| types/react-html-parser |  2.0.3 |
| types/uuid              |  9.0.4 |

## Unit tests

** coming soon **

## End-to-end tests (Cypress)

** coming soon **

## Maintenance

** coming soon **

## Technical tips

** coming soon **

## Further help

To get more help on deploying this, please contact me via [email] (ethanpham.etev@gmail.com)
