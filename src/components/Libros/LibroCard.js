import React from "react";
import { Link } from "react-router-dom";

export const LibroCard = (props) => {
  const { libros } = props;

  return (
    <div className="col">
      <div className="card">
        <img src={libros.imagen} className="card-img-top" alt="Image" />
        <div className="card-body">
          <h5 className="card-title">Información</h5>
          <hr />
          <p className="card-text">
            <strong>Título:</strong> {libros.titulo}
          </p>
          <p className="card-text">
            <strong>Autor:</strong> {libros.autor.nombres}
          </p>
          <p className="card-text">
            <strong>Editorial:</strong> {libros.editorial.nombre}
          </p>
          <p className="card-text">
            <Link to={`libros/edit/${libros._id}`}  className="btn btn-dark">Ver más..</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
