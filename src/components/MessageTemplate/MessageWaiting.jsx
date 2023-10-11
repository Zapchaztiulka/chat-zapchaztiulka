import { PrimaryBtn } from '../Button';
import { BtnLoader } from '../Loader/BtnLoader';
import { iconColors } from '../../helpers';

export const MessageWaiting = () => {
  return (
    <div className="w-8">
      <PrimaryBtn disabled>
        <BtnLoader
          height={8}
          width={32}
          radius={8}
          color={iconColors.disabled}
        />
      </PrimaryBtn>
    </div>
  );
};
