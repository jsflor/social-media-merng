import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import {HomePage, LoginPage, RegisterPage, PostDetailPage} from './pages';
import {NavBar} from './components';
import {AuhtProvider} from './context/auth';
import AuthRoute from "./util/AuthRoute";

const App = () => {
    return (
        <AuhtProvider>
            <Router>
                <Container>
                    <NavBar/>
                    <Route exact path='/' component={HomePage}/>
                    <AuthRoute exact path='/login' component={LoginPage}/>
                    <AuthRoute exact path='/register' component={RegisterPage}/>
                    <Route exact path='/posts/:postId' component={PostDetailPage}/>
                </Container>
            </Router>
        </AuhtProvider>
    );
}
export default App;
