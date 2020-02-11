import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
// import { Container } from "./styles";

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form>
        <input type="email" placeholder="Seu email" required />
        <input type="password" placeholder="Sua senha secreta" required />

        <button type="submit">Acessar</button>
        <Link to="/register">Crie uma conta gratuita</Link>
      </form>
    </>
  );
}
