import { useState, useEffect, useCallback } from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const CreateTask = () => {
	const { push, query } = useRouter();

	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
	});

	const { title, description } = newTask;

	const [isSubmit, setIsSubmit] = useState(false);
	const [errors, setErrors] = useState({});

	const getTask = useCallback(async () => {
		const response = await fetch(
			`https://my-first-next-js-todo-65tqj4vy0-hiros-dev.vercel.app/api/tasks/${query.id}`
		);
		const {task} = await response.json();
		setNewTask({ title: task.title, description: task.description });
	}, [query.id]);

	useEffect(() => {
		if (query.id) getTask();
	}, [query.id, getTask]);

	const validate = () => {
		let errors = {};
		if (!title) {
			errors.title = 'Title is required';
		}
		if (!description) {
			errors.description = 'Description is required';
		}
		return errors;
	};

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setNewTask({
			...newTask,
			[name]: value,
		});
	};

	const createTask = async () => {
		try {
			await fetch(
				`https://my-first-next-js-todo-65tqj4vy0-hiros-dev.vercel.app/api/tasks`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				}
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	const updateTask = async () => {
		try {
			await fetch(
				`https://my-first-next-js-todo-65tqj4vy0-hiros-dev.vercel.app/api/tasks/${query.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				}
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = validate();
		if (Object.keys(errors).length) return setErrors(errors);

		setIsSubmit(true);
		if (query.id) {
			await updateTask();
		} else {
			await createTask();
		}
		await push('/');
	};

	return (
		<Grid
			centered
			verticalAlign='middle'
			columns='3'
			style={{ height: '80vh' }}
		>
			<Grid.Row>
				<Grid.Column textAlign='center'>
					<div>
						<h1>{query.id ? 'Update Task' : 'Create Task'}</h1>
						<div>
							{isSubmit ? (
								<Loader active inline='centered' />
							) : (
								<Form onSubmit={handleSubmit}>
									<Form.Input
										error={
											errors.title
												? { content: 'Please enter a title' }
												: null
										}
										label='Title'
										placeholder='Enter title'
										name='title'
										onChange={handleChange}
										value={title}
										autoFocus
									/>
									<Form.TextArea
										error={
											errors.description
												? { content: 'Please enter a description' }
												: null
										}
										label='Description'
										placeholder='Enter Description'
										name='description'
										onChange={handleChange}
										value={description}
										autoFocus
									/>
									<Button type='submit' primary>
										{query.id ? 'Update' : 'Submit'}
									</Button>
								</Form>
							)}
						</div>
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
export default CreateTask;
