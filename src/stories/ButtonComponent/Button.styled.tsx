import styled from "styled-components";
import { Theme } from "../../Theme";

type StyledButtonProps = {
  bgColor: string;
  color: string;
  size: string;
  border: string;
  borderRadius: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  border: solid 2px ${Theme.colors.darkslategrayColor};
  cursor: pointer;
  width: 204px;
  height: 60px;

  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => (borderRadius ? "30px" : "0px")};
`;

export default StyledButton;
