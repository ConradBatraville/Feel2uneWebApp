const router = require('express').Router()
const {GiantPlaylist} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const playlist = await GiantPlaylist.findAll({
            attributes: ['spotifyId']
        })
        res.status(200).json(playlist)
      } catch(err) {next(err)}
  })

  router.get('/highenergy', async (req, res, next) => {
    try {
        const track = await GiantPlaylist.findOne({
          where: {mood: 'Energy Boost'},
          order: [
            [Sequelize.fn('RANDOM')] 
          ],
          attributes: ['image', 'artistName', 'songTitle', 'albumName']
        })
        res.status(200).json(track)
      } catch(err) {next(err)}
  })

  router.get('/dance', async (req, res, next) => {
    try {
        const track = await GiantPlaylist.findOne({
          where: {mood: 'Dance-y'},
          order: [
            [Sequelize.fn('RANDOM')] 
          ],
          attributes: ['image', 'artistName', 'songTitle', 'albumName']
        })
        res.status(200).json(track)
      
      } catch(err) {next(err)}
  })

  router.get('/happy', async (req, res, next) => {
    try {
        const track = await GiantPlaylist.findOne({
          where: {mood: 'Positive Vibes'},
          order: [
            [Sequelize.fn('RANDOM')] 
          ],
          attributes: ['image', 'artistName', 'songTitle', 'albumName']
        })
        res.status(200).json(track)
      } catch(err) {next(err)}
  })

  router.get('/sad', async (req, res, next) => {
    try {
        const track = await GiantPlaylist.findOne({
          where: {mood: 'Mellow Mood'},
          order: [
            [Sequelize.fn('RANDOM')] 
          ],
          attributes: ['image', 'artistName', 'songTitle', 'albumName']
        })
        res.status(200).json(track)
      } catch(err) {next(err)}
  })

router.post('/', async (req, res, next) => {
    try {
        const playlist = await GiantPlaylist.create({image: req.body.image, spotifyId: req.body.spotifyId,
           artistName: req.body.artistName, songTitle: req.body.songTitle, albumName: req.body.albumName })
        res.status(200).json(playlist)
      } catch(err) {next(err)}
  })

router.put('/', async (req, res, next) => {
    try {
      console.log('B O D Y **** *', req.body)
      const track = await GiantPlaylist.update({mood: req.body.mood}, {where: {spotifyId: req.body.spotifyId }})
      res.status(200).json(track)
    } catch (err) {next(err)}
})