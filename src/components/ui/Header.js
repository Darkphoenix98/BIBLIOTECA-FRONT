import React from 'react'
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">

                <NavLink className="navbar-brand" exact to='/'>BIBLIOTECA SOFT</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                    <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/'>Libros</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/autores'>Autores</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/editoriales'>Editoriales</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/ejemplares'>Ejemplares</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/usuarios'>Usuarios</NavLink>
                        </li>

                        
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/prestamos'>Prestamos</NavLink>
                        </li>
                     

                    </ul>
                </div>

            </div>
        </nav>
    )
}