import useFunnel from '@/hooks/useFunnel';

export default function AddPost() {
  const [Funnel, setStep] = useFunnel(
    ['가입방식', '집주소', '주민번호', '가입완료', '하이'] as const,
    '하이',
  );
  return (
    <Funnel>
      <Funnel.Step name="가입방식">
        <h1 onClick={() => setStep('집주소')}>가입방식</h1>
      </Funnel.Step>
      <Funnel.Step name="집주소">
        <h2 onClick={() => setStep('주민번호')}>집주소</h2>
      </Funnel.Step>
      <Funnel.Step name="주민번호">
        <h3 onClick={() => setStep('가입완료')}>주민번호</h3>
      </Funnel.Step>
      <Funnel.Step name="가입완료">
        <h4 onClick={() => console.log('완료')}>가입완료</h4>
      </Funnel.Step>
    </Funnel>
  );
}
