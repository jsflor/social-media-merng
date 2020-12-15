import {useState} from 'react';
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {Button, Icon, Confirm} from "semantic-ui-react";

import {FETCH_POSTS_QUERY} from "../util/graphql";

const DeleteButton = ({postId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {postId},
        update(proxy){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: data.getPosts.filter(p => p.id !== postId)
                }
            });
            setConfirmOpen(false);
            callback && callback();
        }
    });

    return (
        <>
            <Button as={'div'} color={'red'} floated={'right'} onClick={() => setConfirmOpen(true)}>
                <Icon name={'trash'} style={{margin: 0}} />
            </Button>
            <Confirm
                open={confirmOpen}
                onConfirm={deletePost}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export default DeleteButton;
