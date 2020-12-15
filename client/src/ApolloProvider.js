import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';

import App from './App';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080'
});

const authLink = setContext((_, { headers }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token;

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const ApolloWrapper = () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

export default ApolloWrapper;
