const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
    //first, unrelated to this function, create the gamestore database in PSQL
    //Get all the data from the videoGames table vis SELECT *
    //look at boardGame.js for syntax conventions, it's weird!
    //Return all the data
async function getAllVideoGames() {
    try {
        const { rows: videogames } = await client.query(`
            SELECT * FROM videogames
        `);
        return videogames;
    } catch (error) {
        throw new Error("Make sure you have read a book of fiction, perhaps Ernest Hemingway, as an alternative to playing video games all day.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
    //HI, Nick here...
    //Is this one just moving the function higher?
    //NO! let's look at some other files...api?
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE: 
    //Put some parameters entered in by the user into a new row in the videogames table
    //async/await
    const { name, description, price, inStock, isPopular, imgUrl } = body;
    try { 
        const {rows: [videogame]} = await client.query(`
        INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `
        , [name, description, price, inStock, isPopular, imgUrl]);
        return videogame;
    } catch(err){
        throw err;
    } 
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    //take an id parameter
    //find the id in the videogame database WHERE the requested id = the game id
    //use SET instead of INSERT INTO the row in the videogame table
        //LOOK at logic in db/boardgames.js 
            //This is such a cool way of syncing up what a user types in rather than specifying 
                //...each and every field. 
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [videoGame] } = await client.query(`
            UPDATE videogames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return boardGame;
    } catch (error) {
        throw error;
}
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
    // select the game by id (select id...where req.id === videogame(id))
    try {
        const { rows: [videoGame] } = await client.query(`
            DELETE FROM videogames
            WHERE id=${id}
            RETURNING *;
        `);
        return boardGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}