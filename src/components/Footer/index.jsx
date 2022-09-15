import React from "react";
import {
  InstagramOutlined,
  FacebookOutlined,
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
      <Text>© 2022 LAMA. All rights reserved. </Text>
      <IconsContainer>
        <IconWrapper Comp={InstagramOutlined} />
        <IconWrapper Comp={FacebookOutlined} />
        <IconWrapper Comp={YoutubeOutlined} />
      </IconsContainer>
    </Container>
  );
};

export default Footer;
