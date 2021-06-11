import mongoose from 'mongoose';
import dotenv from 'dotenv';

class Database 
{
  
    get connectionPath()
    {
        const host = process.env.MONGO_HOST;
        const port = process.env.MONGO_PORT;
        const db   = process.env.MONGO_DB;
        const user = process.env.MONGO_USER;
        const pwd  = process.env.MONGO_PASS;

        return `mongodb://${user}:${pwd}@${host}:${port}/${db}`
    }
    get connectionOptions()
    {
        return {useNewUrlParser: true, useUnifiedTopology: true};
    }

    connect()
    {
      
        mongoose.connect(this.connectionPath, this.connectionOptions)
        .then( () => {
            console.log('\n\nConnected to the DB')
        })
        .catch( error => {
            console.log(`\n\nAn error occured when trying to connect to the database. ${error}`)
        })
    }
}

export default Database;