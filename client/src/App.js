import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import manager from './component-manager';

import Layout from './components/layout';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Layout>
            <Home />
          </Layout>
        </Route>

        <Route exact path='/projects'>
          <Layout>
            Projects
          </Layout>
        </Route>

        <Route exact path='/bio'>
          <Layout>
            Bio
          </Layout>
        </Route>

        <Route exact path='/blog'>
          <Layout>
            Blog
          </Layout>
        </Route>

        <Route exact path='/login'>
          <Layout>
            Login
          </Layout>
        </Route>

        <Route path='*'>
          <Layout>
            404
          </Layout>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
