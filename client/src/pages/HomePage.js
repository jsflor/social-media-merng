import {Grid} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';

import {PostCard} from '../components';

const HomePage = () => {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row style={{display:'block', textAlign:'center', fontSize:'2rem', marginTop:10}}>
                <Grid.Column>
                    <h1>Recent posts</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {loading ? <h1>loading posts...</h1> : (
                    data && data.getPosts && data.getPosts.map((p) => (
                        <Grid.Column key={p.id} style={{marginBottom: 20}}>
                            <PostCard post={p}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default HomePage;
