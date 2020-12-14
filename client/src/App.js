import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import {HomePage, LoginPage, RegisterPage} from './pages';
import {NavBar} from './components';

const App = () => {
    return (
        <Router>
            <Container>
                <NavBar/>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
            </Container>
        </Router>
    );
}
export default App;
