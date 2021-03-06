import Head from 'next/head';
import Navbar from '../components/Navbar';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Task App</title>
				<meta
					name='description'
					content='Todo list. Generated by create next app'
				/>
			</Head>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
