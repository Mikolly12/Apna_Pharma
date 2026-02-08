import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomerReviews } from "../../../redux/pharmacy/selectors";
import { getCustomerReviews } from "../../../redux/pharmacy/operations";
import { useMediaQuery } from "react-responsive";
import { Container, ImgBox, Item, List, Text, Title } from "./Reviews.styled";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectCustomerReviews);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const reviewsLimit = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    dispatch(
      getCustomerReviews({
        limit: reviewsLimit,
      })
    );
  }, [dispatch, reviewsLimit]);

  return (
    <>
      <section>
        <Container>
          <Title>Reviews</Title>
          <Text>Search for Medicine, Filter by your location</Text>
          <List>
            {reviews?.map((review) => (
              <Item key={review._id}>
                <ImgBox>
                  <img src={review.photo} alt="person" />
                </ImgBox>
                <h3>{review.name}</h3>
                <p>{review.testimonial}</p>
              </Item>
            ))}
          </List>
        </Container>
      </section>
    </>
  );
};

export default Reviews;
