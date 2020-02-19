import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      cursor: pointer;
      background: none;
      border: 0;
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  background-color: #fff;
  font-size: 18px;
  padding: 20px;
  border-radius: 4px;

  opacity: ${props => (props.past ? 0.6 : 1.0)};

  strong {
    display: block;
    font-weight: normal;
    color: ${props => (props.available ? "#999" : "#7159c1")};
    font-size: 20px;
  }

  span {
    color: ${props => (props.available ? "#999" : "#666")};
    display: block;
    margin-top: 3px;
  }
`;
