import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "../axios";

const fetchData = async (albumId) => {
  // const request = await axios.get(`getImages/${albumId}`);
  console.log(albumId);
  // return request.data[0];
};

function PreviewAlbum({ albumId, title, profileImgUrl }) {
  const [image, setImage] = useState("");

  const { data, status } = useQuery(`getImages${albumId}`, async () => {
    const request = await axios.get(`getImages/${albumId}`);
    return request.data;
  });

  useEffect(() => {
    if (data !== undefined) {
      var i = 1; //  set your counter to 1

      function myLoop() {
        //  create a loop function
        setTimeout(function () {
          //  call a 3s setTimeout when the loop is called
          if (data[i] != undefined) setImage(data[i].photo_url); //  your code here
          i++; //  increment the counter
          // if (i < 10) {
          //   //  if the counter < 10, call the loop function
          myLoop(); //  ..  again which will trigger another
          // } //  ..  setTimeout()
        }, 6000);
      }

      myLoop();
    }
  }, [data]);

  return (
    <Container>
      {status === "success" && (
        <>
          <Wrap>
            <img src={image === "" ? data[0].photo_url : image} alt="" />
            <TitleContainer>
              <img src={profileImgUrl} alt="" />
              {title}
            </TitleContainer>
          </Wrap>
        </>
      )}
    </Container>
  );
}

export default PreviewAlbum;

const Container = styled.div``;

const Wrap = styled.div`
  width: 190px;
  height: 220px;
  /* background-color: red; */
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);
  box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.11);
  cursor: pointer;
  transform: all 250ms ease;

  img {
    width: 100%;
    height: 145px;
    object-fit: cover;
    animation-name: fade;
    animation-timing-function: ease-in-out;
  }

  &:hover {
    transform: scale(1.06);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 65px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 100px;
    margin: 5px;
  }
`;
