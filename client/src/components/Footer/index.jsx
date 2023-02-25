import React from "react";
import {
  InstagramOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Container, Icons, IconsContainer, Text } from "./styles";

const IconWrapper = ({ Comp }) => {
  return (
    <>
      <Icons>
        <Comp />
      </Icons>
    </>
  );
};

const Footer = () => {
  return (
    <Container>
      <Text>© 2022 FastWeb. All rights reserved. </Text>
      <IconsContainer>
        <IconWrapper
          onClick={() => {
            window.open(
              "https://www.instagram.com/_vaibhav_._931_/",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          Comp={InstagramOutlined}
        />
        <IconWrapper
          onClick={() => {
            window.open(
              "https://github.com/VaibhavKhandare",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          Comp={GithubOutlined}
        />
        <IconWrapper
          onClick={() => {
            window.open(
              "https://www.youtube.com/channel/UClcw6Bd6PgvopdcN9FRZM9Q",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          Comp={YoutubeOutlined}
        />
      </IconsContainer>
    </Container>
  );
};

export default Footer;
