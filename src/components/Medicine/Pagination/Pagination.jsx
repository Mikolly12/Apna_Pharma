import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage } from "../../../redux/pharmacy/selectors";
import { Btn, BtnList, Wrapper } from "./Pagination.styled";
import { setCurrentPage } from "../../../redux/pharmacy/slice";
import { BiFirstPage } from "react-icons/bi";
import { BiLastPage } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const buttonsPerPage = isMobile ? 2 : 3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageClick = useCallback(
    (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
    [dispatch]
  );

  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const start = Math.max(1, currentPage - Math.floor(buttonsPerPage / 2));
    const end = Math.min(totalPages, start + buttonsPerPage - 1);

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <Btn
          key={i}
          type="button"
          current={i === currentPage ? "true" : undefined}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Btn>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <Wrapper>
        <BtnList>
          <Btn type="button" onClick={() => dispatch(setCurrentPage(1))}>
            <BiFirstPage style={{ fill: "#1D1E21" }} />
          </Btn>
          <Btn type="button" onClick={handlePrevClick}>
            <GrFormPrevious />
          </Btn>
        </BtnList>
        <BtnList>
          {currentPage > Math.floor(buttonsPerPage / 2) + 1 && (
            <Btn type="button" onClick={handlePrevClick}>
              ...
            </Btn>
          )}
          {renderPageButtons()}
          {currentPage < totalPages - Math.floor(buttonsPerPage / 2) && (
            <Btn type="button" onClick={handleNextClick}>
              ...
            </Btn>
          )}
        </BtnList>
        <BtnList>
          <Btn type="button" onClick={handleNextClick}>
            <GrFormNext />
          </Btn>
          <Btn
            type="button"
            onClick={() => dispatch(setCurrentPage(totalPages))}
          >
            <BiLastPage />
          </Btn>
        </BtnList>
      </Wrapper>
    </>
  );
};

export default Pagination;
