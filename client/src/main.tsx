import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import UserManagement from './features/user-management';

import './main.css';
import './shared/styles/elements.css';

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000';

const client = new ApolloClient({
	link: new HttpLink({
		uri: graphqlUrl,
	}),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<UserManagement />
			<footer>
				👨🏻‍💻 |{' '}
				<strong>
					<a
						target="_blank"
						href="https://slaveofthecode.vercel.app/"
						rel="noopener"
					>
						Gustavo Lopez
					</a>
				</strong>
			</footer>
		</ApolloProvider>
	</StrictMode>,
);
