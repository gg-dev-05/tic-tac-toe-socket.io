import { Game } from "./components/Game";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to={`/game/${uuidV4()}`} />
				</Route>
				<Route path="/game/:id">
					<Game />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
