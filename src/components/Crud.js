import React, { useEffect, useState } from "react";
import TablaMascotas from "./TablaMascotas";
import SelectTipos from "./SelectTipos";
import FormularioCrud from "./FormularioCrud";
import Spinner from "../components/Spinner";
import Navegador from "./Navegador";
import short from "short-uuid";

const Crud = () => {
  const [mascotas, setmascota] = useState([]);
  const [mascotaEdit, setmascotaEdit] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [flag, setflag] = useState(false);
  const URL = "http://localhost:5000/mascotas";
  const URLTIPOS = "http://localhost:5000/tipos";

  useEffect(() => {
    const getMascotas = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        data.forEach((mascota) => {
          setmascota((mascotas) => {
            return [...mascotas, mascota];
          });
        });
        setflag(true);
      } catch (err) {}
    };

    const getTipos = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        data.forEach((tipo) => {
          setTipos((tipos) => {
            return [...tipos, tipo];
          });
        });
      } catch (err) {}
    };

    getMascotas(URL);
    getTipos(URLTIPOS);
  }, []);

  const createMascota = (nuevaMascota) => {
    console.log(nuevaMascota);
    nuevaMascota.id = short.generate();
    setflag(false);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaMascota),
    })
      .then((res) => res.json())
      .then((nuevaMascota) => {
        setmascota((mascotas) => [...mascotas, nuevaMascota]);
      })
      .finally(() => setflag(true));
  };

  const updateMascota = (mascotaEditada) => {
    setflag(false);
    fetch(`${URL}/${mascotaEditada.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mascotaEditada),
    })
      .then((res) => res.json())
      .then((mascotaEditada) => {
        setmascota((mascotas) => {
          return mascotas.map((mascota) =>
            mascota.id === mascotaEditada.id ? mascotaEditada : mascota
          );
        });
      })
      .finally(() => setflag(true));
  };

  const deleteMascota = (idMascota) => {
    if (
      window.confirm(
        "confirma la eliminacion de la mascota '" + idMascota + "'?"
      )
    )
      setflag(false);
    fetch(`${URL}/${idMascota}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((mascotaEditada) => {
        setmascota((mascotas) => {
          return mascotas.filter((mascota) => mascota.id !== idMascota);
        });
      })
      .finally(() => setflag(true));
  };

  return (
    <div>
      <div className="p-3">
        <FormularioCrud
          tipos={tipos}
          createMascota={createMascota}
          updateMascota={updateMascota}
          mascotaEdit={mascotaEdit}
          setmascotaEdit={setmascotaEdit}
        ></FormularioCrud>
      </div>
      {flag ? (
        <>
          <div>
            <SelectTipos tipos={tipos} />
            <Navegador tipos={tipos} />
          </div>
          <div>
            <TablaMascotas
              mascotas={mascotas}
              setmascotaEdit={setmascotaEdit}
              deleteMascota={deleteMascota}
            />
          </div>
        </>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Crud;
