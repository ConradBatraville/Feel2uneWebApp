const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

// var qs = require('querystring');


// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  // app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}


// server.js
// where your node app starts

// init project



// init Spotify API wrapper

// var SpotifyWebApi = require('spotify-web-api-node');

// var spotifyApi = new SpotifyWebApi({
//   clientId : '504291cd195c496d881c760b0e3f9fd6D',
//   clientSecret : 'a3a9dd7638c447d3b47b8684cee48bca',
// });

// const jssdkscopes = ["streaming", "user-read-birthdate", "user-read-email", "user-read-private", "user-modify-playback-state"];
// const redirectUriParameters = {
//   client_id: '504291cd195c496d881c760b0e3f9fd6',
//   response_type: 'token',
//   scope: jssdkscopes.join(' '),
//   redirect_uri: encodeURI('http://localhost:8080/callback'),
//   show_dialog: true,
// }

// const redirectUri = `https://accounts.spotify.com/authorize?${qs.stringify(redirectUriParameters)}`;

// function authenticate(callback) {
//   spotifyApi.clientCredentialsGrant()
//     .then(function(data) {
//       console.log('The access token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
    
//       callback instanceof Function && callback();

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     }, function(err) {
//       console.log('Something went wrong when retrieving an access token', err.message);
//     });
// }
// authenticate();

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// const reAuthenticateOnFailure = (action) => {
//   action(() => {
//     authenticate(action);
//   })
// }
// app.get("/search", function (request, response) {
//   reAuthenticateOnFailure((failure) => {
//     spotifyApi.searchTracks(request.query.query, { limit: 2 })
//     .then(function(data) {
//       response.send(data.body);
//     }, failure);
//   })
// });


// app.get("/spotifyRedirectUri", function (request, response) {
//   response.send(JSON.stringify({
//     redirectUri
//   }, null, 2))
// });

// app.get("/features", function (request, response) {
//   reAuthenticateOnFailure((failure) => {
//     spotifyApi.getAudioFeaturesForTrack(request.query.id)
//     .then(function(data) {
//       response.send(data.body);
//     }, failure);
//   })
// });

// app.get("/analysis", function (request, response) {
//   reAuthenticateOnFailure((failure) => {
//     spotifyApi.getAudioAnalysisForTrack(request.query.id)
//     .then(function(data) {
//       response.send(data.body);
//     }, failure);
//   });
// });

// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });











const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
