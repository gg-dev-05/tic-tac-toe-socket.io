import { Game } from "./components/Game";
import { Bot } from "./components/Bot";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/bot" exact>
					<Bot />
				</Route>
				<Route path="/game/:id">
					<Game />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
