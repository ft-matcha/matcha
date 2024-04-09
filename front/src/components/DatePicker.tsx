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
  console.log(date);
  return (
    <>
      <InputContainer type="date" name="date" id="date" value={date} />
    </>
  );
};

export default DatePicker;
