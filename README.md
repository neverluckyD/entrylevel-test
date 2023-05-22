# EntryLevel Take home assessment - Huynh Thanh Duy

This project was bootstraped using NextJS and [Redux Toolkit](https://redux-toolkit.js.org).
The **Redux Toolkit** is a standardized way to write Redux logic (create actions and reducers, setup the store with some default middlewares like redux devtools extension)

## Deployment

This project was deployed using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):
You can view the [demo](https://entrylevel-test.vercel.app/) here.

## How to use

Execute with [npm](https://docs.npmjs.com/cli/init), or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the project:

Install dependencies
```bash
npm install
```

Run in local environment
```bash
npm run dev
```

Build executable bundle
```bash
npm run build
```

# Design choices / Trade-offs

I chose [NextJs](https://nextjs.org/) with [Typescript](https://www.typescriptlang.org/) to demonstrate my development skills, and used [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) to build backend APIs in the same codebase. [Redux Toolkit](https://redux-toolkit.js.org) was my choice to handle state managements for this project, since it is my comfortable skill in React. I used [with-redux](https://github.com/vercel/next.js/tree/canary/examples/with-redux) example as a boilerplate for faster development and better coding standard.

In backend, I was wondering if I can cache the "database data" API for better performance (since it was sometimes slow and created timeouts), but then decided to handle errors if there is any timeout call. When working with the data, I choose to use normal "for" loop since it is better in term of performance if the database is much bigger, and easier for manipulating data, instead of using all Array methods for it (would be sort=>reduce=>filter=>slice). The trade-offs would be longer code that need to be commented/documented for others to maintain.

In frontend, I implemented multiple selection with autocomplete for both filters, so it is easier for user to get their filters, and can be developed to support more on those filters (more options, custom options). But this will create a big issue when user clicks on options multiple times in a short duration, which will create a lot of API calls. To prevent this, I implemented debounce for both filters, so they can not call multiple times in short time (currently configured 500ms). 
Error and loading states are also implemented for better user experience. Mobile responsiveness was awared as well.