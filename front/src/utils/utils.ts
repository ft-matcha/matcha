export const removeEmptyValue = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce(
    (
      acc: {
        [key: string]: any;
      },
      [key, value],
    ) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
};
