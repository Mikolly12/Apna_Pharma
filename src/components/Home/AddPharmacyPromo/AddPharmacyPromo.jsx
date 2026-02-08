import React from "react";
import {
  Btn,
  Container,
  FeaturesList,
  ImgBox,
  Item,
  Text,
  Title,
  Wrapper,
} from "./AddPharmacyPromo.styled";
import { NavLink } from "react-router-dom";
import usualMob from "../../../images/add-mob@1x.png";
import retinaMob from "../../../images/add-mob@2x.png";
import usualTab from "../../../images/add-tab@1x.png";
import retinaTab from "../../../images/add-tab@2x.png";
import usualDesk from "../../../images/add-desk@1x.png";
import retinaDesk from "../../../images/add-desk@2x.png";
import { useMediaQuery } from "react-responsive";
import sprite from "../../../images/sprite.svg";

const AddPharmacyPromo = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  return (
    <>
      <section>
        <Container>
          <Wrapper>
            <div>
              <Title>Add the medicines you need online now</Title>
              <Text>
                Enjoy the convenience of having your prescriptions filled from
                home by connecting with your community pharmacy through our
                online platform.
              </Text>
              <Btn type="button">
                <NavLink to="/medicine-store">Buy medicine</NavLink>
              </Btn>
            </div>
            <ImgBox>
              {isMobile && (
                <img
                  srcSet={`${usualMob} 1x, ${retinaMob} 2x`}
                  alt="illustration"
                />
              )}
              {isTablet && (
                <img
                  srcSet={`${usualTab} 1x, ${retinaTab} 2x`}
                  alt="illustration"
                />
              )}
              {isDesktop && (
                <img
                  srcSet={`${usualDesk} 1x, ${retinaDesk} 2x`}
                  alt="illustration"
                />
              )}
            </ImgBox>
          </Wrapper>
          <FeaturesList>
            <Item>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              Take user orders form online
            </Item>
            <Item>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              Create your shop profile
            </Item>
            <Item>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              Manage your store
            </Item>
            <Item>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              Get more orders
            </Item>
            <Item>
              <svg>
                <use href={`${sprite}#lightning`} />
              </svg>
              Storage shed
            </Item>
          </FeaturesList>
        </Container>
      </section>
    </>
  );
};

export default AddPharmacyPromo;
