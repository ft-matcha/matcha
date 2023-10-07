"use client";

import Input from "./components/Input";
import SubmitButton from "./components/SubmitButton";

function Page() {
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <form
        action={onSubmit}
        className="flex-col gap-y-4 w-[450px] md:border-2 md:h-[600px]"
      >
        <h3 className="text-4xl mb-10">로그인</h3>
        <Input
          labelData="test"
          labelName="id"
          inputClass="w-full h-12 p-10 text-2xl border-solid border-2 rounded-lg gap-y-4 "
        />
        <Input
          labelData="test"
          labelName="password"
          type="password"
          inputClass="w-full h-12 p-10 text-2xl border-solid border-2 rounded-lg "
        />
        <SubmitButton className="w-full h-12 leading-6	pt-5 p-10 text-center text-3xl  border-solid border-2 rounded-lg ">
          로그인
        </SubmitButton>
      </form>
    </>
  );
}

export default Page;
