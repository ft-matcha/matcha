const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
