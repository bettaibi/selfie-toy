import Header from './components/header/Header';
import Home from './components/home/Home';
import Selfie from './components/selfie/Selfie';
import MyPic from './components/myPic/MyPic';

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <HashRouter basename='/'>
      <Header />

      <main className="main">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/selfie" component={Selfie} />
          <Route path="/my-pic" component={MyPic} />
        </Switch>
      </main>
    </HashRouter>
  );
}

export default App;
