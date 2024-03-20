## Setup

- Make sure the following extensions are installed in VSCode
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)



## Getting started

- Clone this repo
- Create a `.env.local` file with the following info:

  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID = [get from sanity studio]
  NEXT_PUBLIC_SANITY_DATASET = production
  SANITY_READ_TOKEN = [get from sanity studio]
  ```

- Run `npm install`
- To start the app run `npm run dev`
- The Sanity studio runs on [http://localhost:3000/studio](http://localhost:3000/studio)
- To build the app (as in the pipeline) run `npm run build`