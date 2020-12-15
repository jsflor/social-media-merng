import {useState, useContext} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {Form, Button} from 'semantic-ui-react';

import {AuthContext} from "../context/auth";
import {useForm} from "../util/hooks";

const LoginPage = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: '',
    });

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}){
            console.log(userData);
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div style={{width: 400, margin: "auto"}}>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label={'Username'}
                    placeholder={'Username...'}
                    name={'username'}
                    type={'text'}
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}
                />
                <Form.Input
                    label={'Password'}
                    placeholder={'Password...'}
                    name={'password'}
                    type={'password'}
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                />
                <Button type={'submit'} primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className={'ui error message'}>
                    <ul className={'list'}>
                        {Object.values(errors).map(v => (
                            <li key={v}>{v}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default LoginPage;
