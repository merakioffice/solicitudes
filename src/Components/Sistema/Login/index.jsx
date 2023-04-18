import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// PrimeReact
import sd from "./logo.jpeg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { fetchLogin } from "../../../api/api";

import { Button } from "primereact/button";
import { Image } from "primereact/image";
import "./login.scss";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchLogin("login", "POST", login);

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate(`/Dashboard`);
    }
  };
  return (
    <div className={`containerLogin`}>
      <div className={`imgLogin`}>
        <div style={{}}>
          <img
            src={sd}
            alt="Image Text"
            className="imgscreem"
            style={{ width: "50vw", height: "100vh" }}
          />
        </div>
      </div>
      <div className={`formLogin`}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <h1 className="text-center">Bienvenidos</h1>
          <div className="field">
            <label htmlFor="Correo electronico">
              Introducir correo electronico
            </label>
            <InputText
              className="inputs"
              value={login.email}
              type="email"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="Contraseña">Introducir contraseña</label>
            <Password
              className="inputs"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              feedback={false}
            />
          </div>
          <Button type="submit" label={"Ingresar"} className="inputs" />
        </form>
      </div>
    </div>
  );
}
