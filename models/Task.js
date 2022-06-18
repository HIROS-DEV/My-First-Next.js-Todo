import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'The task title is required'],
			trim: true,
			maxlength: [40, 'The title cannnot be greator than 40 chars'],
		},
		description: {
			type: String,
			required: [true, 'The task description is required'],
			trim: true,
			maxlength: [
				200,
				'The description cannnot be greator than 200 chars',
			],
		},
	},
	{ timestamps: true }
);

export default models.Task || model('Task', taskSchema);