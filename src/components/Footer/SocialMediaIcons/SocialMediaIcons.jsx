import React from "react";
import { Icon, Wrapper } from "./SocialMediaIcons.styled";
import sprite from "../../../images/sprite.svg";

const SocialMediaIcons = () => {
  return (
    <>
      <Wrapper>
        <a
          href="https://www.facebook.com/goITclub/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon>
            <svg>
              <use href={`${sprite}#facebook`} />
            </svg>
          </Icon>
        </a>
        <a
          href="https://www.instagram.com/goitclub/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon>
            <svg>
              <use href={`${sprite}#instagram`} />
            </svg>
          </Icon>
        </a>
        <a
          href="https://www.youtube.com/c/GoIT"
          target="_blank"
          rel="noreferrer"
        >
          <Icon>
            <svg>
              <use href={`${sprite}#youtube`} />
            </svg>
          </Icon>
        </a>
      </Wrapper>
    </>
  );
};

export default SocialMediaIcons;
