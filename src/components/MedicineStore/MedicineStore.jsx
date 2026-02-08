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
  Title,
  VisitStoreBtn,
  Wrapper,
} from "./MedicineStore.styled";
import sprite from "../../images/sprite.svg";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

// 🔹 Dummy store data (temporary)
const dummyStores = [
  {
    _id: "1",
    name: "Apollo Pharmacy",
    address: "MG Road",
    city: "Pune",
    phone: "9876543210",
    rating: 4.5,
    isOpen: true,
  },
  {
    _id: "2",
    name: "MedPlus",
    address: "FC Road",
    city: "Pune",
    phone: "9123456780",
    rating: 4.2,
    isOpen: false,
  },
  {
    _id: "3",
    name: "Wellness Forever",
    address: "Baner Road",
    city: "Pune",
    phone: "9988776655",
    rating: 4.7,
    isOpen: true,
  },
  {
    _id: "4",
    name: "Medlife Pharmacy",
    address: "Koregaon Park",
    city: "Pune",
    phone: "9876543211",
    rating: 4.6,
    isOpen: true,
  },
  {
    _id: "5",
    name: "NetMeds",
    address: "Viman Nagar",
    city: "Pune",
    phone: "9123456781",
    rating: 4.4,
    isOpen: true,
  },
  {
    _id: "6",
    name: "1mg Pharmacy",
    address: "Hadapsar",
    city: "Pune",
    phone: "9988776656",
    rating: 4.3,
    isOpen: false,
  },
  {
    _id: "7",
    name: "CVS Pharmacy",
    address: "Aundh",
    city: "Pune",
    phone: "9876543212",
    rating: 4.8,
    isOpen: true,
  },
  {
    _id: "8",
    name: "Jio Health",
    address: "Kothrud",
    city: "Pune",
    phone: "9123456782",
    rating: 4.5,
    isOpen: true,
  },
  {
    _id: "9",
    name: "Dr. Agarwal Pharmacy",
    address: "Deccan",
    city: "Pune",
    phone: "9988776657",
    rating: 4.6,
    isOpen: false,
  },
  {
    _id: "10",
    name: "Medicine Box",
    address: "Kalyani Nagar",
    city: "Pune",
    phone: "9876543213",
    rating: 4.4,
    isOpen: true,
  },
  {
    _id: "11",
    name: "HealthKart Pharmacy",
    address: "Indira Nagar",
    city: "Pune",
    phone: "9123456783",
    rating: 4.7,
    isOpen: true,
  },
  {
    _id: "12",
    name: "Chemist Online",
    address: "Wakad",
    city: "Pune",
    phone: "9988776658",
    rating: 4.5,
    isOpen: false,
  },
];

const MedicineStore = () => {
  const stores = dummyStores; // 🔥 use dummy data instead of Redux
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const storesLimit = isDesktop ? 9 : 8;

  useEffect(() => {
    // 🔕 Disabled backend call for now
    // dispatch(getAllStores({ limit: storesLimit }));
  }, [storesLimit]);

  return (
    <section>
      <Container>
        <Title>Medicine store</Title>
        <Wrapper>
          <List>
            {stores.map((store) => (
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

                {isTabletOrDesktop && (
                  <VisitStoreBtn type="button">
                    <NavLink to="/medicine">Visit Store</NavLink>
                  </VisitStoreBtn>
                )}

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
  );
};

export default MedicineStore;
