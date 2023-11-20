import styled from 'styled-components';

export const ContainerSelect = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select<{ color: string }>`
  background-color: ${props => props.color};
  color: #fff;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  font-size: 16px;
`;

export const Label = styled.label<{ color: string }>`
  font-size: 12px;
  color: ${props => props.color};
`;
