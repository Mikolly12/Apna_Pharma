import React, { useState } from "react";
import sprite from "../../../images/sprite.svg";
import { CustomSelect, Form, Label, SubmitBtn } from "./Filter.styled";
import { useDispatch } from "react-redux";
import { getSearchProducts } from "../../../redux/pharmacy/operations";

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "60px",
    border: "1px solid rgba(29, 30, 33, 0.10)",
    height: "46px",
    background: "#fff",
    fontSize: "12px",
  }),
  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    paddingLeft: "18px",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "rgba(29, 30, 33, 0.40)",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    textTransform: "capitalize",
    color: "rgba(29, 30, 33, 0.40)",
  }),
  indicatorSeparator: (baseStyles, state) => ({
    ...baseStyles,
    display: "none",
  }),
  indicatorsContainer: (baseStyles, state) => ({
    ...baseStyles,
    paddingRight: "8px",
  }),
};

const options = [
  { value: "", label: "All Categories" },
  { value: "Pain Relief", label: "Pain Relief" },
  { value: "Antibiotics", label: "Antibiotics" },
  { value: "Vitamins & Supplements", label: "Vitamins & Supplements" },
  { value: "Cold & Cough", label: "Cold & Cough" },
  { value: "Digestive", label: "Digestive" },
  { value: "Heart & Blood Pressure", label: "Heart & Blood Pressure" },
  { value: "Diabetes", label: "Diabetes" },
  { value: "Skin & Derma", label: "Skin & Derma" },
];

const Filter = ({ totalPages }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState({ value: "", label: "All Categories" });
  const [searchedName, setSearchedName] = useState("");

  const handleCategoryChange = (selectedOption) => {
    console.log("📁 Category selected:", selectedOption);
    setSelectedCategory(selectedOption);
    
    // Trigger filter with new category and current search
    console.log("🔎 Filtering with category:", selectedOption.value, "and search:", searchedName);
    dispatch(
      getSearchProducts({
        category: selectedOption.value,
        name: searchedName,
      })
    );
  };

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    console.log("🔍 [SEARCH INPUT] User typed:", searchValue);
    setSearchedName(searchValue);
    
    // Trigger filter immediately as user types
    console.log("🔎 [DISPATCH] Filtering with category:", selectedCategory.value, "and search:", searchValue);
    dispatch(
      getSearchProducts({
        category: selectedCategory.value,
        name: searchValue,
      })
    ).then((result) => {
      console.log("📊 [DISPATCH RESULT] Returned", result?.payload?.length, "products");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔎 Filter button clicked - Category:", selectedCategory.value, "Search:", searchedName);
    
    dispatch(
      getSearchProducts({
        category: selectedCategory.value,
        name: searchedName,
      })
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CustomSelect
          options={options}
          placeholder="Product category"
          styles={customStyles}
          onChange={handleCategoryChange}
          value={selectedCategory}
        />
        <Label htmlFor="name">
          <input
            type="text"
            id="name"
            placeholder="Search medicine"
            value={searchedName}
            onChange={handleSearchInputChange}
            autoComplete="off"
          />
          <svg>
            <use href={`${sprite}#search`} />
          </svg>
        </Label>
        <SubmitBtn type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M12.8307 1.75H1.16406L5.83073 7.26833V11.0833L8.16406 12.25V7.26833L12.8307 1.75Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter
        </SubmitBtn>
      </Form>
    </>
  );
};

export default Filter;
