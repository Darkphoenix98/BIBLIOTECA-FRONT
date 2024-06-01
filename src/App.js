import React from 'react';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/footer'; 
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LibroView } from './components/Libros/LibroView';
import { AutorView } from './components/autores/AutorView';
import { EditorialView } from './components/editoriales/EditorialView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { EjemplarView } from './components/ejemplares/EjemplarView';
import { PrestamoView } from './components/prestamos/PrestamoView';
import { LibroUpdate } from './components/Libros/LibroUpdate';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path='/' component={LibroView} />
          <Route exact path='/autores' component={AutorView} />
          <Route exact path='/editoriales' component={EditorialView} />
          <Route exact path='/usuarios' component={UsuarioView} />
          <Route exact path='/ejemplares' component={EjemplarView} />
          <Route exact path='/prestamos' component={PrestamoView} />
          <Route exact path='/libros/edit/:librosId' component={LibroUpdate} />
          <Redirect to='/' />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export {
  App
}
