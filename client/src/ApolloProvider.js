import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';

import App from './App';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const ApolloWrapper = () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

export default ApolloWrapper;
