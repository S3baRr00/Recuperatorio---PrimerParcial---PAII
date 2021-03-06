import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="d-flex flex-column h-100 w-100 align-items-center justify-content-center">
      <div className="mt-5 p-3 col-6 bg-danger-outline rounded">
        <h1>Ha Ocurrido un error</h1>
        <h3>La pagina a la que intentaste acceder no esta disponible</h3>
        <Link to="/">
          <button className="btn btn-large btn-primary">
            Volver a Pagina Principal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
