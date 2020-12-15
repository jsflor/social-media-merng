import {useContext, useLayoutEffect, useState} from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {Button, Card, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";

import {AuthContext} from "../context/auth";
import {DeleteButton, LikeButton} from "../components";

const PostDetailPage = (props) => {
    const postId = props.match.params.postId;
    const context = useContext(AuthContext);

    const [postData, setPostData] = useState({});

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {postId}
    });

    useLayoutEffect(() => {
        if (data && data.getPost) {
            setPostData(data.getPost);
        } else {
            setPostData({});
        }
    }, [data]);

    const onComment = () => {};

    const deletePostCallback = () => {
        props.history.push('/');
    };

    return (
        <>
            {!postData ? <h1>Loading post...</h1>
            : (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Image
                                    floated='right'
                                    size='small'
                                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header>{postData.username}</Card.Header>
                                        <Card.Meta>{moment(postData.createdAt).fromNow()}</Card.Meta>
                                        <Card.Description>{postData.body}</Card.Description>
                                    </Card.Content>
                                    <hr />
                                    <Card.Content extra>
                                        <LikeButton user={context.user} post={{id: postData.id, likes: postData.likes, likeCount: postData.likeCount}}/>
                                        <Button labelPosition='right' as={'div'} onClick={onComment}>
                                            <Button color='blue' basic>
                                                <Icon name='comments' />
                                            </Button>
                                            <Label basic color='blue' pointing='left'>
                                                {postData.commentCount}
                                            </Label>
                                        </Button>
                                        {context.user && context.user.username === postData.username && (
                                            <DeleteButton postId={postData.id} callback={deletePostCallback} />
                                        )}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
        </>
    );
};

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;
export default PostDetailPage;
