import { FC } from 'react';
import styled from 'styled-components';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'textarea';
  label: string;
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent<any>) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
};

export const Input: FC<InputProps> = ({ type, label, name, value, onBlur, onChange }) => {
  return (
    <StyledLabel>
      <div>{label}</div>
      {type === 'textarea' ? (
        <StyledTextarea name={name} id={name} onBlur={onBlur} onChange={onChange} value={value} />
      ) : (
        <StyledInput type={type} name={name} id={name} value={value} onBlur={onBlur} onChange={onChange} />
      )}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  font-weight: 700;
  margin: 0.5em 0;
  display: block;
  width: 100%;
`;

const StyledInput = styled.input`
  font-size: 1em;
  border: 1px solid #dedede;
  padding: 0.5em;
  width: 100%;
  border-radius: 0.5em;
`;

const StyledTextarea = styled.textarea`
  font-size: 1em;
  border: 1px solid #dedede;
  padding: 0.5em;
  width: 100%;
  border-radius: 0.5em;
`;
