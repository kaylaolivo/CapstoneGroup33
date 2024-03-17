/*const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://keo76:39DGniD6B6j6Z7QO@cluster0.og9ozv7.mongodb.net/?retryWrites=true&w=majority';

const createPlaces = async (req, res, next) => {
    const newPlaces = { name: req.body.name, location: req.body.location,zip:req.body.zip};
    const client = new MongoClient(url);
    
    try {
        await client.connect();
        const db = client.db();
        await db.collection('places').insertOne(newPlaces);
        client.close();
        res.json(newPlaces); 
    } catch (error) {
        client.close();
        res.status(500).json({message: "Could not store data."});
    }

    client.close();
};



exports.createPlaces = createPlaces;
exports.getPlaces = getPlaces;


*/
