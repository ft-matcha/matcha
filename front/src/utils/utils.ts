export const removeEmptyValue = (
  obj: Record<string, any>,
  org: Record<string, any>,
  diffAlgorithm?: (cpy: any, org: any) => boolean,
) => {
  return Object.entries(obj).reduce(
    (
      acc: {
        [key: string]: any;
      },
      [key, value],
    ) => {
      if (
        value &&
        (typeof diffAlgorithm === undefined ||
          (typeof diffAlgorithm === 'function' && diffAlgorithm(value, org[key])))
      ) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
};
