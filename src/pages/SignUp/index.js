import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form>
        <input type="text" placeholder="Nome completo" required />
        <input type="email" placeholder="Seu email" required />
        <input type="password" placeholder="Sua senha secreta" required />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </>
  );
}
