import styled, { keyframes } from "styled-components";

const LoadingKeyFrame = keyframes`
  0%{
      transform: scale(1);
  }
  50%{
      opacity: .3;
      transform: scale(2);
  }
  100%{
      transform: scale(1)
  }
`;

const LoaderStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .loader {
    position: absolute;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate(-50%, -50%);
  }

  .dot {
    width: 24px;
    height: 24px;
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation: ${LoadingKeyFrame} 1s infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: #32aacc;
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: #64aacc;
  }
  .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: #96aacc;
  }
  .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: 96aacc;
  }
  .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: #faaacc;
  }
`;

export const Loader = () => {
  return (
    <LoaderStyle>
      <div className="loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </LoaderStyle>
  );
};
