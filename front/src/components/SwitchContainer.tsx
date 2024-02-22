import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Input from '@/components/ui/input';

const SwitchContainer = ({ ...rest }) => {
  const ref = useRef(rest.name);
  const [switchState, setSwitchState] = useState(false);

  useEffect(() => {}, [switchState]);

  const onDobuleClick = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <div onDoubleClick={onDobuleClick}>
      <Input
        {...rest}
        onChange={(e) => {
          ref.current = e.target.value;
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') onDobuleClick();
        }}
        readOnly={switchState}
      />
    </div>
  );
};

export default SwitchContainer;
