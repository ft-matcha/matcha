import Form from '@/components/ui/Form';
import { userGender } from '../../data/AuthData';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export const GenderForm = ({ onNext }: { onNext: () => void }) => {
  return (
    <div>
      <Select name="gender" id="gender">
        {userGender.map((gender) => (
          <option value={gender}>{gender}</option>
        ))}
      </Select>
      <Button onClick={onNext}></Button>
    </div>
  );
};


const ChangeProfile = () => {
  return <Form />;
};

export default ChangeProfile;
