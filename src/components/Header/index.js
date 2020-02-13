import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo-purple.svg";
import { Container, Content, Profile } from "./styles";

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Marcus Reaiche</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/face/4/3/0/00ff00"
              alt="Marcus Reaiche"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
