import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/news" exact component={NewRoom}/> 
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
      </BrowserRouter>
  )
}

export default App;


// Exact serve para validar o id da url apenas para 1 pagina.
// Switch from react --> nunca vai deixar a mesma rota de url ser chamada ao mesmo tempo.