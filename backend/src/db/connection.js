import mongoose from 'mongoose';

const connectDB = (url)=>{
    mongoose.connect(url)
    .then((result) => {
       console.log(`Database connected successfully. DB HOST: `, result.connection.host);
    }).catch((err) => {
        console.log('Database connection failed', err);
    });
}

export default connectDB;