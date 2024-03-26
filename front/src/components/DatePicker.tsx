import React from 'react';
import InputContainer from '@/components/InputContainer';

const DatePicker = ({
  date,
  setFunnel,
}: {
  date?: string;
  setFunnel: (
    props: (prev: Record<string, any>) => Record<string, any> | Record<string, any>,
  ) => void;
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setFunnel((prev: Record<string, any>) => ({
      ...prev,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };
  return (
    <>
      <InputContainer type="date" name="date" id="date" onChange={onChange} value={date} />
    </>
  );
};

export default DatePicker;
