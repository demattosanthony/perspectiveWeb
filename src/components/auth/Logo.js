import React from "react";
import styled from "styled-components";

function Logo() {
  return (
    <Container>
      <img src="/app_logo.png" alt="" />
      <h1>Perspective Albums</h1>
    </Container>
  );
}

export default Logo;

const Container = styled.div`
  /* margin-top: 100px; */
  max-width: 650px;
  height: 100px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    height: 75px;
    width: 75;
    padding: 0px 30px;
  }

  h1 {
    font-family: "Billabong2";
    font-size: 75px;
    font-weight: 100;
  }
  @media (max-width: 1200px) {
    h1 {
      font-size: 65px;
    }
    @media (max-width: 835px) {
      h1 {
        font-size: 55px;
      }

      @media (max-width: 635px) {
        font-size: 50px;

        img {
          height: 60px;
          width: 60px;
          padding: 0px 30px;
        }
        h1 {
          font-size: 50px;
        }
      }
    }
  }
`;
