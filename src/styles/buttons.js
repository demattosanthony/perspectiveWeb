import styled from "styled-components";

export const BlueButton = styled.button`
  background-color: #438afe;
  color: white;
  font-size: ${(props) => props.fontSize};
  border: none;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 250ms;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export const GoogleDriveBtn = styled.button`
  background-color: #438afe;
  color: white;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  border: 1px solid transparent !important;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.25px;
  transition: all 250ms;
  margin-right: 20px;
  padding: 5px;

  &:hover {
    background-color: rgb(26, 115, 232);
  }
`;
