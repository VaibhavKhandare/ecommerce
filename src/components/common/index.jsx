import { useNavigate } from "react-router-dom";
import { useHover, useShift } from "../../util/customHook";
import {
  Container,
  CardContainer,
  CardInfo,
  Brand,
  Desc,
  Price,
  CenterColumn,
  CardImageOverflow,
  CardImageContainer,
  CardImage,
} from "./styles";

const ImageContainer = ({ images = [] }) => {
  const [hovered, eventHandlers] = useHover();
  const [shift] = useShift(hovered, images.length);
  return (
    <CardImageOverflow>
      <CardImageContainer {...eventHandlers} shift={shift}>
        {images.map((val, idx) => (
          <CardImage key={idx} src={val} />
        ))}
      </CardImageContainer>
    </CardImageOverflow>
  );
};
export const CardsContainer = ({ data = [], setUrl }) => {
  const navigate = useNavigate();
  return (
    <Container>
      {data.map((oneCard = {}, idx) => (
        <CenterColumn key={idx}>
          <CardContainer
            onClick={() => {
              if (setUrl) {
                setUrl(`/product/${oneCard._id}`);
              } else navigate(`/product/${oneCard._id}`);
            }}
          >
            <ImageContainer images={oneCard.images || []} />
            <CardInfo>
              <Brand>{oneCard.brand}</Brand>
              <Desc>{oneCard.description}</Desc>
              <Price>Rs.{oneCard.price}</Price>
            </CardInfo>
          </CardContainer>
        </CenterColumn>
      ))}
    </Container>
  );
};
