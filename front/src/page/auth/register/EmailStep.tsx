import { ApiContainer } from '@/api/api';
import { uniqueEmail } from '@/api/uniqueEmail';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import { Form } from 'react-router-dom';

const EmailStep = <T extends readonly string[]>({
  api,
  onSubmit,
  setForm,
}: {
  api: ApiContainer;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, nextStep?: T[number]) => void;
  setForm: (
    update: (prev: Record<string, string | boolean>) => Record<string, string | boolean>,
  ) => void;
}) => {
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e, 'userinfo');
        }}
      >
        <InputContainer name="email" id="email" type="email" required={true}>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const email = e.currentTarget.previousElementSibling;
              const response = await uniqueEmail(api, email.value);
              if (response?.success) {
                setForm((prev) => ({ ...prev, emailValid: true }));
              } else if (email) {
                email.focus();
              }
            }}
          >
            중복 확인
          </Button>
        </InputContainer>
        <InputContainer
          notFocus={true}
          name="password"
          id="password"
          type="password"
          required={true}
        />
        <Button>다음</Button>
      </Form>
    </>
  );
};

export default EmailStep;
