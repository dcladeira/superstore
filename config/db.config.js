import mongoose from 'mongoose';

async function connect() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`${dbConnection.connection.name} conectato com sucesso!`);
    } catch (error) {
        console.log('Falha na conexão:', error);
    }
}

export default connect;