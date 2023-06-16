import mongoose, { connect } from "mongoose"

const connectDB =async () => {
    return await mongoose.connect(process.env.LOCAL_DB).then(() => {
        console.log('connect success');
    }).catch((err) => {
        console.log(`error to connect DB ${err}`);
    })
}
export default connectDB;