import Task from '../../../models/Task';
import connectDB from '../../../utils/mongoose';
import { runMiddleware } from '../../../utils/middleware';
import Morgan from 'morgan';

connectDB();

export default async function handler(req, res) {
	const {
		method,
		body,
		query: { id },
	} = req;
	const morgan = Morgan('dev');

	switch (method) {
		case 'GET':
			try {
				const task = await Task.findById(id);
				if (!task)
					return res
						.status(404)
						.json({ message: 'Task does not exist.' });
				await runMiddleware(req, res, morgan);
				return res.status(200).json({ task });
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}
		case 'DELETE':
			try {
				const deletedTask = await Task.findByIdAndDelete(id);
				if (!deletedTask)
					return res
						.status(404)
						.json({ message: 'Task does not exist.' });
				await runMiddleware(req, res, morgan);
				return res.status(204).json({ message: "Task deleted successfully!!" });
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}
		case 'PUT':
            try {
                const updatedTask = await Task.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators:true
                })

                if (!updatedTask) return res.status(404).json({ message: "Task does not exist." })
                return res.status(200).json({task: updatedTask})
			} catch (error) {
				return res.status(500).json({ message: error.message });
			}

		default:
			return res.status(400).json({message: "This method is not supported!!"});
	}
}
