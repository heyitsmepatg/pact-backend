# Welcome to Undercut Node Server

To get up and running,

1. Run `npm install`

2. Run `npm run start`

3. Navigate to `localhost:3000/hello`

To build and deploy locally,

1. Ensure your docker daemon is running

2. Run `docker build -t [YOUR_USERNAME_HERE]/undercut-app .`

3. Run `docker run -p 8080:3000 [YOUR_USERNAME_HERE]/undercut-app`
