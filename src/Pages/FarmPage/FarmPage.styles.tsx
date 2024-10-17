import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #ffffff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;

  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;

export const Message = styled.p`
  font-size: 18px;
  color: #777;
  margin-top: 20px;
`;
