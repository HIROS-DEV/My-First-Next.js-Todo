import Task from '../../../models/Task';
import connectDB from '../../../utils/mongoose';
import {runMiddleware} from '../../../utils/middleware'
import Morgan from 'morgan';

connectDB();

export default async function handler(req, res) {
	const { method, body } = req;
	const morgan = Morgan('dev');

	switch (method) {
		case 'GET':
			try {
				const tasks = await Task.find();
                await runMiddleware(req,res, morgan);
				return res.status(200).json({ tasks });
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}
		case 'POST':
			try {
                const newTask = new Task(body);
                await newTask.save();
                await runMiddleware(req, res, morgan);
				return res.status(200).json({ task: newTask });
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}

		default:
			return;
	}
}
