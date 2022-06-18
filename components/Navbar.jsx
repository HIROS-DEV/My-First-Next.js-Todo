import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Container, Button } from 'semantic-ui-react';

const Navbar = () => {
	const router = useRouter();
	return (
		<Menu
			inverted
			borderless
			style={{ padding: '.3rem', marginBottom: '20px' }}
			attached
			color='green'
		>
			<Container>
				<Menu.Item name='home'>
					<Link href='/'>
						<img src='/vercel.svg' alt='logo' />
					</Link>
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Button
							size='mini'
							primary
							onClick={() => router.push('/tasks/new')}
						>
							New Task
						</Button>
					</Menu.Item>
				</Menu.Menu>
			</Container>
		</Menu>
	);
};

export default Navbar;
