import React, { useState } from 'react';

interface TagSelectorProps<T extends readonly string[]> {
  selectors: T[];
  selector: T[number];
}


const TagSelector = <T extends readonly string[]>({ selector }: TagSelectorProps<T>) => {
  return <></>;
};

const useTagSelector = <T extends readonly string[]>(selectors: T, defaultSelector: T[number]) => {
  const [selector, setSelector] = useState(defaultSelector);

  const SelectElement = React.useCallback(
    Object.assign((props: Omit<TagSelectorProps<T>, 'selector'>) => (
      <TagSelector selector={selector} {...props} />
    )),
    [selectors],
  );

  return [SelectElement, setSelector] as const;
};

export default TagSelector;
