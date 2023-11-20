import styled from 'styled-components';

export const Button = styled.button<{ color: string; wSize: string; hSize: string }>`
  width: ${props => props.wSize};
  height: ${props => props.hSize};
  background-color: ${props => props.color};
  border: none;
  border-radius: 5px;
  margin: 20px 0 5px 0;
  cursor: pointer;
`;
