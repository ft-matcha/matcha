import React, { useState } from 'react';

interface TagSelectorProps<T extends readonly string[]> {
  selectors: T[];
  selector: T[number];
}

interface TagObjectInterface<T extends readonly string[]>{
	[key: T[number]]: React.ReactNode;
}

const TagObject= <TagObjectInterface<T>>{
  profile: <ProfileTag />,
  like: <LikeTag />,
  recommend: <RecommendTag />,
};

const TagSelector = <T extends readonly string[]>({ selector }: TagSelectorProps<T>) => {
  if (Object.keys(TagObject).includes(selector)) {
    return <>TagObject[selector]</>;
  }
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
