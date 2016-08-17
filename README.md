# Available Rooms

Description

Available Rooms is a DashBoard which displays List of Meeting Rooms based on status whether it is Booked Or Available at that Moment.

#Project Structure:

- /app
- /app/index.js - Entry point for your app
- /public
- /public/index.html
- /server
- /server/bundle.js - Our workflow code
- .env(configure your environment variables and don't check this in to git)
- server.js - Express and proxies
- webpack.config.js
- webpack.production.config.js
- package.json - Deployment and project configuration

#Installation and Running:

git clone  ssh://git@stash.resource.com:7999/rint/availablerooms.git

- cd availablerooms
- npm install ( u might have to do sudo because node module 'ews-javascript-api' need write permission to create a dir)
- Before you run npm start , you need to configure username/pwd in order to connect exchange server(typically it is same username/pwd you use to login to your computer)
- You can either configure credentials as your environment variables(~/user_profile) or create .env file with variables (exchange_username = 'username',exchange_password = '********') . Node module 'dotenv' will pick it up.
- npm start
- navigate to http://localhost:3000 in your browser of choice.

#OverView:

The project runs with React by default and hot replacement of changes to the modules. Currently it is on 0.14.3.

We use Webpack to configure our development workflow i.e. **webpack.config.js** 

**Note:** Note that we are not actually outputting any files when running the workflow, but we want these “in-memory” files to be fetched from the same path as in production, localhost:3000/build/bundle.js. 
That way we only need one index.html file.

**server/bundle.js** is used to build the bundler.

Finally we have to set up a proxy between our express server and the webpack-dev-server

##Express Server :
If you are just going to use the Node server as a development tool for prototyping or actually run it in production you will need something to handle the requests from the browser.
Express is great for that ,so **server.js** is where it is configured.

##Summary:

Okay, now we have the actual workflow going. Just run npm start and you get automatic refresh, hot loading styles, source mapping and everything else you would want to add to Webpack

##Exchange Server Connection :

Feed.js is file where exchange server is configured.We use node module 'ews-javascript-api' to establish connection to Exchange service.
when we run *npm start* ,after server connection is established we will make call to exchange api "GetUserAvailability".
We use Socket.io to communicate between client and server.


#Production bundle

Just run npm **_postinstall_** or **_node deploy.js_**
 
Before we actually deploy any code we want to produce a production bundle of the application.
That said, what service you choose affects how you run this bundling. At its core, this is what we want to run:

webpack -p --config webpack.production.config.js


















