import {useContext} from 'react';
import {Grid} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';

import {PostCard, PostForm} from '../components';
import {AuthContext} from "../context/auth";
import {FETCH_POSTS_QUERY} from "../util/graphql";

const HomePage = () => {
    const context = useContext(AuthContext);
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row style={{display:'block', textAlign:'center', fontSize:'2rem', marginTop:10}}>
                <Grid.Column>
                    <h1>Recent posts</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {context.user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
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

export default HomePage;
