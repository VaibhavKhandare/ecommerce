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
      <Text>
        © 2022 Condé Nast. All rights reserved. Use of this site constitutes
        acceptance of our User Agreement and Privacy Policy and Cookie Statement
        and Your California Privacy Rights. The New Yorker may earn a portion of
        sales from products that are purchased through our site as part of our
        Affiliate Partnerships with retailers. The material on this site may not
        be reproduced, distributed, transmitted, cached or otherwise used,
        except with the prior written permission of Condé Nast. Ad Choices
      </Text>
      <IconsContainer>
        <IconWrapper Comp={InstagramOutlined} />
        <IconWrapper Comp={FacebookOutlined} />
        <IconWrapper Comp={YoutubeOutlined} />
      </IconsContainer>
    </Container>
  );
};

export default Footer;
