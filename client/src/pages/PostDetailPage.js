import {useContext, useLayoutEffect, useState, useRef} from 'react';
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Card, Form, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";

import {AuthContext} from "../context/auth";
import {DeleteButton, LikeButton} from "../components";

const PostDetailPage = (props) => {
    const postId = props.match.params.postId;
    const context = useContext(AuthContext);

    const commentInputRef = useRef(null);

    const [postData, setPostData] = useState({});
    const [comment, setComment] = useState('');

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {postId}
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
       variables: {postId, body: comment},
        update() {
           setComment('');
           commentInputRef.current.blur();
        }
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

    const {username, id, createdAt, body, likes, likeCount, comments, commentCount} = postData;

    return !postData ? <h1>Loading post...</h1> : (
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
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton user={context.user} post={{id: id, likes: likes, likeCount: likeCount}}/>
                            <Button labelPosition='right' as={'div'} onClick={onComment}>
                                <Button color='blue' basic>
                                    <Icon name='comments' />
                                </Button>
                                <Label basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                            {context.user && context.user.username === username && (
                                <DeleteButton postId={id} callback={deletePostCallback} />
                            )}
                        </Card.Content>
                    </Card>
                    {context.user && (
                        <Card fluid>
                            <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className={'ui action input fluid'}>
                                        <input
                                            type={'text'}
                                            placeholder={'Comment...'}
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <button
                                            type={'submit'}
                                            className={'ui button teal'}
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments && comments.map(comment => (
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {context.user && context.user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id} />
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>
                                    {moment(comment.createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
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

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export default PostDetailPage;
