import { Route, Switch } from "react-router-dom";

import ListPage from "./pages/ListPage";
import SingleListPage from "./pages/SingleListPage";
import "./scss/App.scss";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ListPage} />
      <Route exact path='/characters/:name/:id' component={SingleListPage} />
    </Switch>
  );
}

export default App;
