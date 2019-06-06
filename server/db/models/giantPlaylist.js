const Sequelize = require('sequelize')
const db = require('../db')

const GiantPlaylist = db.define('giant_playlist', {
    image: {
      type: Sequelize.STRING,
      validate: {
          isUrl: true
      }  
    },
    spotifyId: {
        type: Sequelize.STRING
    },
    mood: {
        type: Sequelize.STRING
    },
    artistName: {
        type: Sequelize.STRING
    },
    songTitle: {
        type: Sequelize.STRING
    },
    albumName: {
        type: Sequelize.STRING
    }
})

// image, spotifyId -- For now
// 
//  image, spotifyId, valeance, energy, etc ..... After OR save tracks with pre-sorted Moods in a column
module.exports = GiantPlaylist

