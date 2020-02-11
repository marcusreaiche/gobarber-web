import React from "react";
import { Link } from "react-router-dom";
import { Input, Form } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "../../assets/logo.svg";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("O email é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu email" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Acessar</button>
        <Link to="/register">Crie uma conta gratuita</Link>
      </Form>
    </>
  );
}
