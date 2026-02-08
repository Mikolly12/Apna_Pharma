import React, { useEffect } from "react";
import {
  AddressBox,
  Container,
  IsOpenItem,
  Item,
  List,
  PhoneBox,
  RatingBox,
  RatingWithBtn,
  SubTitle,
  Text,
  Title,
  Wrapper,
} from "./NearestStores.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectNearestStores } from "../../../redux/pharmacy/selectors";
import { getNearestStores } from "../../../redux/pharmacy/operations";
import sprite from "../../../images/sprite.svg";

const NearestStores = () => {
  const dispatch = useDispatch();
  const nearestStores = useSelector(selectNearestStores);

  useEffect(() => {
    dispatch(
      getNearestStores({
        limit: 6,
      })
    );
  }, [dispatch]);

  return (
    <>
      <section>
        <Container>
          <Title>Your Nearest Medicine Store</Title>
          <Text>Search for Medicine, Filter by your location</Text>
          <Wrapper>
            <List>
              {nearestStores?.map((store) => (
                <Item key={store._id}>
                  <SubTitle>{store.name}</SubTitle>
                  <AddressBox>
                    <svg>
                      <use href={`${sprite}#map`} />
                    </svg>
                    <ul>
                      <li>
                        <a
                          href={`https://maps.google.com/?q=${store.address},${store.city}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {store.address}
                        </a>
                      </li>
                      <li>{store.city}</li>
                    </ul>
                  </AddressBox>
                  <PhoneBox>
                    <svg>
                      <use href={`${sprite}#phone`} />
                    </svg>
                    <a href={`tel:${store.phone}`}>
                      <p>{store.phone}</p>
                    </a>
                  </PhoneBox>
                  <RatingWithBtn>
                    <RatingBox>
                      <svg>
                        <use href={`${sprite}#star`} />
                      </svg>
                      <p>{store.rating}</p>
                    </RatingBox>
                    <IsOpenItem type="button" open={store.isOpen}>
                      {store.isOpen ? "open" : "close"}
                    </IsOpenItem>
                  </RatingWithBtn>
                </Item>
              ))}
            </List>
          </Wrapper>
        </Container>
      </section>
    </>
  );
};

export default NearestStores;
