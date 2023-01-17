import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogDetails from './components/DogDetails'
import DogCreater from './components/DogCreater'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/home/:id' component={DogDetails}/>
        <Route exact path='/create' component={DogCreater}/>
        <Route />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
