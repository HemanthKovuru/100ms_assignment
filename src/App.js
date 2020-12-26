import { Route, Switch } from "react-router-dom";

import ListPage from "./pages/ListPage";
import SingleListPage from "./pages/SingleListPage";
import ErrorPage from "./pages/ErrorPage";
import "./scss/App.scss";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ListPage} />
      <Route exact path='/characters/:name/:id' component={SingleListPage} />
      <Route path='/error' component={ErrorPage} />
    </Switch>
  );
}

export default App;
