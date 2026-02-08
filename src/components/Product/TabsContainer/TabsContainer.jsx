import React, { useState } from "react";
import {
  BtnBox,
  DescBtn,
  DescList,
  ImgBox,
  ImgNameBox,
  Item,
  Name,
  RatingBox,
  ReviewItem,
  ReviewsBtn,
  ReviewsList,
  Text,
  Time,
  Wrapper,
} from "./TabsContainer.styled";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/pharmacy/selectors";
import sprite from "../../../images/sprite.svg";
import { useMediaQuery } from "react-responsive";

const TabsContainer = () => {
  const product = useSelector(selectProduct);
  const {
    text,
    anti_cancer_properties,
    anti_diabetic_effects,
    digestive_aid,
    heart_health,
    immune_support,
    medicinal_uses,
  } = product.description;

  const [showDesc, setShowDesc] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleReviewsClick = () => {
    setShowDesc(false);
    setShowReviews(true);
  };

  const handleDescClick = () => {
    setShowDesc(true);
    setShowReviews(false);
  };

  return (
    <>
      <Wrapper>
        <BtnBox>
          <DescBtn
            type="button"
            onClick={handleDescClick}
            active={showDesc ? "true" : undefined}
          >
            Description
          </DescBtn>
          <ReviewsBtn
            type="button"
            onClick={handleReviewsClick}
            active={showReviews ? "true" : undefined}
          >
            Reviews
          </ReviewsBtn>
        </BtnBox>
        {showDesc && (
          <DescList>
            <Item>
              <span>{text}</span>
            </Item>
            <Item>
              <span>Medicinal Uses: Antioxidant Properties: </span>
              {medicinal_uses}
            </Item>
            <Item>
              <span>Anti-Diabetic Effects: </span>
              {anti_diabetic_effects}
            </Item>
            <Item>
              <span>Heart Health: </span>
              {heart_health}
            </Item>
            <Item>
              <span>Anti-Cancer Properties: </span>
              {anti_cancer_properties}
            </Item>
            <Item>
              <span>Immune Support: </span>
              {immune_support}
            </Item>
            <Item>
              <span>Digestive Aid: </span>
              {digestive_aid}
            </Item>
          </DescList>
        )}
        {showReviews && (
          <ReviewsList>
            {product?.reviews?.map((review, index) => (
              <ReviewItem key={index}>
                <ImgNameBox>
                  <ImgBox>
                    <img src={review.photo} alt="user" />
                  </ImgBox>
                  <div>
                    <Name>{review.reviewer}</Name>
                    <Time>{review.time}</Time>
                  </div>
                </ImgNameBox>
                <Text>{review.review}</Text>
                <RatingBox>
                  <div>
                    <svg>
                      <use href={`${sprite}#star`} />
                    </svg>
                    {isTabletOrDesktop && (
                      <>
                        <svg>
                          <use href={`${sprite}#star`} />
                        </svg>
                        <svg>
                          <use href={`${sprite}#star`} />
                        </svg>
                        <svg>
                          <use href={`${sprite}#star`} />
                        </svg>
                        <svg style={{ fill: "#F1F1F1" }}>
                          <use href={`${sprite}#star`} />
                        </svg>
                      </>
                    )}
                  </div>
                  <p>{review.rating}</p>
                </RatingBox>
              </ReviewItem>
            ))}
          </ReviewsList>
        )}
      </Wrapper>
    </>
  );
};

export default TabsContainer;
