import { connect } from 'mongoose';

const connectDB = async () => {
	try {
		await connect(process.env.MONGO_URI);
		console.log(`MongoDB is connecting successfully!!`);
	} catch (error) {
		throw new Error(
			`Something happened during connecting Database ${error.message}`
		);
	}
};

export default connectDB;