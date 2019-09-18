import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #ffff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px;

  h1 {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 8px;
  }
`;

export default Container;
