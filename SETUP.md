# Full Stack JS Demo

One repo version

## How to replicate

1. Create a server folder
2. Create a React app using `create-react-app` to the client folder: `npx create react-app client`
   - to `/client/package.json`, add the following, replacing 3001 with the port on your Express server:

    ```json
    // client/package.json

    ...
    "proxy": "http://localhost:3001",
    ...
    ```

   - When you make any axios calls to the backend, you can use relative URLs
   - make sure to remove the Git repo that is automatically initialized by create-react-app; we are going to set up a Git repo in the root folder of our project, not in client:

    ```bash
    cd client
    rm -rf .git
    ```

3. In your project root folder, create a `package.json` that will only contain packages related to running your project

    ```bash
    npm init -y
    npm install -D concurrently
    ```

4. Add the following scripts to `package.json` on the root directory

    ```json
    // /package.json
    ...
    "scripts": {
        "client": "cd client && npm run start",
        "server": "cd server && npm run start",
        "dev": "concurrently --kill-others  \"npm run server\" \"npm run client\""
    },
    ...
    ```

5. Add a `.gitignore` file ignoring the `node_modules/` directory and `.env`
