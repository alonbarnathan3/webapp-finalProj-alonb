const { MongoClient } = require('mongodb');

async function addUser(userName) {
    console.log('addUser');
    const url = "mongodb+srv://alonbarna:LioLioLio@snake.wpwky5a.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url)
 
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
 
        // Make the appropriate DB calls
        await client.db('snake').collection('snakegame').insertOne({ userName, beginnerScore: 0, intermediateScore: 0, expertScore: 0 }); 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function find(userName) {
    console.log('find');
    const url = "mongodb+srv://alonbarna:LioLioLio@snake.wpwky5a.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url)
 
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
 
        // Make the appropriate DB calls
        const result = await client.db('snake').collection('snakegame').findOne({ userName }); 
        if (result) {
            console.log(`Found a listing in the collection with the name '${userName}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name '${userName}'`);
            return null;
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function update(userName, updatedFiled) {
    console.log('update');
    const url = "mongodb+srv://alonbarna:LioLioLio@snake.wpwky5a.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url)
 
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
 
        // Make the appropriate DB calls
        await client.db('snake').collection('snakegame').updateOne({userName}, {$set: updatedFiled})
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// async function getHeighstScoresBeginners() {
//     console.log('get scores');
//     const url = "mongodb+srv://alonbarna:LioLioLio@snake.wpwky5a.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(url)
 
//     try {
//         // Connect to the MongoDB cluster
//         //await client.connect();
 
//         // Make the appropriate DB calls
//         const result = await client.db('snake').collection('snakegame').aggregate([
//             {$group:{_id:"$userName", beginnerScore:{$max:"$beginnerScore"}}},
//             {$project:{_id:0, "userName":"$_id", beginnerScore:1}},
//             {$sort:{beginnerScore:-1}},
//             {$limit: 5}
//         ]);
//         return result;
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

async function list() {
    const url = "mongodb+srv://alonbarna:LioLioLio@snake.wpwky5a.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url)
 
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
 
        // Make the appropriate DB calls
        const result = await client.db('snake').collection('snakegame').find().toArray(); 
        if (result) {
            return result.map(todo => ({ id: todo._id.toHexString(), userName: todo.userName, beginnerScore: todo.beginnerScore, intermediateScore: todo.intermediateScore,  expertScore: todo.expertScore}))
        } else {
            console.log(`No listings found with the name '${userName}'`);
            return null;
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}

module.exports = {
    addUser,
    update,
    find,
    list,
}