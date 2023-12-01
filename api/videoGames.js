const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
    //OK, here's the place to change stuff (not the videogames in the db folder) because REPLACE_ME
    //this needs some Params!
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id, req.body);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    // LOGIC GOES HERE 
    //SHOULD THIS Be POST and not PATCH?
    //call the createVideoGame function from (is it imported a.k.a. required?--yes) the db/videGames.js file
    //TRY: ok, it's an async function...that takes in one param --> body, but it should be req.body
    //response: send the new video game object back
    try {
        const videoGame = await createVideoGame(req.body);
        res.send(videoGame);
    } catch (error){
        next(error);
    }
    

});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    // LOGIC GOES HERE 
    // send the video game id and the body of what gets changed in the db
    try {
        const videoGame = await updateVideoGame(req.params.id, req.body);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    // LOGIC GOES HERE
    try {
        const videoGame = await deleteVideoGame(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
