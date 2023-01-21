# access-panel

Web access panel for liftoff.

## Getting Started

You need to have [A11yWatch](https://github.com/a11ywatch/a11ywatch) running locally for development and the [vercel CLI](https://vercel.com/docs/cli) installed.

1. `npm i vercel -g`
1. `a11ywatch start`.
2. `yarn`
3. `vercel dev`
4. open `http://localhost:3000/`

## API

Test vercel API route:

```
curl --location --request GET 'http://localhost:3000/api/handler?name=Jman'
```

## Todo

1. add custom tsconfig assign for astro vite.