import { Game } from "./components/Game";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Home } from "./components/Home";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/game/:id">
					<Game />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
