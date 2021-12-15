import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Ul = styled.ul`
  list-style-type: none;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li`
  background-color: purple;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 1rem;
  &:hover {
    background-color: #e68ae6;
  }
`;

const HeaderList = styled.div`
  width: inherit;
  text-align: left;
`;

const HeaderUpStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const List = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch(console.log);
  }, []);

  console.log("render");
  return (
    <>
      <Ul>
        {users.map((user) => (
          <Item key={user.login.uuid}>
            <FacePhoto urlPhoto={user.picture.large} />
            <HeaderList>
              <HeaderUpStyled>
                <span>{`${user.name.first} ${user.name.last}`}</span>
                <Paragrph type="caption">{user.location.city}</Paragrph>
              </HeaderUpStyled>
              <Paragrph>{user.location.country}</Paragrph>
            </HeaderList>
          </Item>
        ))}
      </Ul>
    </>
  );
};

const FacePhotoStyled = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`;
const FacePhoto = ({ urlPhoto }) => (
  <FacePhotoStyled src={urlPhoto} alt="face identificatoion" />
);

const Paragrph = styled.p`
  font-weight: bold;

  ${(props) => {
    const typeStyles = handleType(props.type);
    return css`
      ${typeStyles}
    `;
  }};
`;

const handleType = (type) => {
  if (type === "caption") {
    return `
            font-size: 1rem;
            color: white;
        `;
  } else {
    return `
            font-size: 0.8rem;
            color: tomato;
            font-style: italic;
        `;
  }
};
