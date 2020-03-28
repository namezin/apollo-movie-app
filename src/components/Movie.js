import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;

const Poster = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  overflow: hidden;
`;

export default ({ id, bg, isLiked }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked: isLiked }
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg}></Poster>
      </Link>
      <button onClick={toggleMovie}>{isLiked ? "UnLike" : "Like"}</button>
    </Container>
  );
};
