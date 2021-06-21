import React from "react";
import styled from "styled-components";

function TextField({ placeholder, value, onChange, type }) {
  return (
    <TextField2
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    ></TextField2>
  );
}

export default TextField;

const TextField2 = styled.input`
  width: 350px;
  padding: 5px;
  margin: 10px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #d3d3d3;

  @media (max-width: 900px) {
    width: 300px;

    @media (max-width: 768px) {
      width: 250px;
    }

    @media (max-width: 560px) {
      width: 250px;
    }
  }
`;
