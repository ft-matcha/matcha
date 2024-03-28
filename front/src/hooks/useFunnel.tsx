import { FunnelProps, StepProps } from '@/types';
import React, { Children, ForwardedRef, ReactNode, isValidElement, useMemo, useState } from 'react';

const Funnel = <T extends readonly string[]>({ step, children }: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find((child) => (child.props as StepProps<T>)?.name === step);

  if (!targetElement) {
    return null;
  }
  return <>{targetElement}</>;
};

const Step = <T extends readonly string[]>({ children, title }: StepProps<T>) => {
  return (
    <>
      {title ? <h2>{title}</h2> : null}
      {children}
    </>
  );
};

const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep: T[number],
  title?: string,
) => {
  const [step, setStep] = useState(defaultStep);

  const FunnelElement = Object.assign(
    (props: Omit<FunnelProps<T>, 'step'>) => <Funnel step={step} {...props} />,
    {
      Step: (props: StepProps<T>) => <Step {...props} title={title} />,
    },
  );

  return [FunnelElement, setStep] as const;
};

export default useFunnel;
