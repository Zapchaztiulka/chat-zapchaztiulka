import { useMediaQuery } from 'react-responsive';

import {
  PrimaryBtn,
  PrimaryBtnWithIcon,
  SecondaryBtn,
  SecondaryBtnWithIcon,
  SecondGreyBtn,
  SecondGreyBtnWithIcon,
  TertiaryBtn,
  TertiaryBtnWithPhoneIcon,
  TertiaryBtnWithArrow,
  DestructiveBtn,
  DestructiveBtnWithIcon,
  OnlyIconBtn,
  SearchBtn,
  SearchBtnMini,
} from '../components/Button';
import { BtnLoader } from '../components/Loader';
import { Container } from '../utils';
import tailwindcss from '../../tailwind.config';

const tailwindExtend = tailwindcss.theme.extend;
const { tablet } = tailwindExtend.screens;

const ButtonExamples = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: tablet });

  return (
    <Container>
      <div className="flex flex-wrap gap-5 pt-10">
        <PrimaryBtn to="/">Button</PrimaryBtn>
        <PrimaryBtnWithIcon to="/">Button</PrimaryBtnWithIcon>
        <SecondaryBtn to="/">Button</SecondaryBtn>
        <SecondaryBtnWithIcon to="/">Button</SecondaryBtnWithIcon>
        <SecondGreyBtn to="/">Button</SecondGreyBtn>
        <SecondGreyBtnWithIcon to="/">Button</SecondGreyBtnWithIcon>
        <TertiaryBtn title="Показати ще" to="/">
          Button
        </TertiaryBtn>
        <TertiaryBtnWithPhoneIcon title="Показати ще" to="/">
          Button
        </TertiaryBtnWithPhoneIcon>
        <TertiaryBtnWithArrow title="Показати ще" to="/">
          Button
        </TertiaryBtnWithArrow>
        <DestructiveBtn to="/">Button</DestructiveBtn>
        <DestructiveBtnWithIcon to="/">Button</DestructiveBtnWithIcon>
        <OnlyIconBtn to="/" />
        <SearchBtn to="/" />
        <SearchBtnMini to="/" />
        <PrimaryBtn to="/">
          <BtnLoader
            height={isSmallScreen ? 16 : 24}
            width={isSmallScreen ? 48 : 64}
            radius={isSmallScreen ? 6 : 9}
            color={tailwindExtend.colors.iconColors.contrast}
          />
        </PrimaryBtn>
        <PrimaryBtn disabled>
          <BtnLoader
            height={isSmallScreen ? 16 : 24}
            width={isSmallScreen ? 48 : 64}
            radius={isSmallScreen ? 6 : 9}
            color={tailwindExtend.colors.iconColors.disabled}
          />
        </PrimaryBtn>
      </div>
    </Container>
  );
};

export default ButtonExamples;
