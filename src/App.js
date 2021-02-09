import Header from './components/header/Header';
import Home from './components/home/Home';
import Selfie from './components/selfie/Selfie';
import MyPic from './components/myPic/MyPic';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <main className="main">
        <Switch>
          <Route path="/" exact>
             <Home />
          </Route>
          <Route path="/selfie">
             <Selfie />
          </Route>
          <Route path="/my-pic">
            <MyPic />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
