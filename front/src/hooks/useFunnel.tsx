import React, { Children, ForwardedRef, ReactNode, isValidElement, useMemo, useState } from 'react';

interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: ReactNode;
}

interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

const Funnel = <T extends readonly string[]>({ step, children }: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find((child) => (child.props as StepProps<T>)?.name === step);

  if (!targetElement) {
    return null;
  }
  return <>{targetElement}</>;
};

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep: T[number],
  forwardRef?: ForwardedRef<T>,
) => {
  const [step, setStep] = useState(defaultStep);

  const FunnelElement = Object.assign(
    (props: Omit<FunnelProps<T>, 'step'>) => <Funnel step={step} {...props} />,
    {
      Step: (props: StepProps<T>) => <Step {...props} />,
    },
  );

  return [FunnelElement, setStep] as const;
};

export default useFunnel;
