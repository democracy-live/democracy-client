import { by, element, waitFor } from 'detox';
export const getRandomNumber = () => {
  const min = 111111111;
  const max = 9999999999999;
  return (Math.random() * (max - min) + min).toString();
};

export const verifyBySidemenu = async () => {
  await waitFor(element(by.id('BurgerMenuButton')))
    .toBeVisible()
    .withTimeout(20000);
  await element(by.id('BurgerMenuButton')).tap();

  await element(by.text('unverifizierter Nutzer')).tap();

  await waitFor(element(by.id('StartVerificationButton')))
    .toBeVisible()
    .withTimeout(20000);
  await element(by.id('StartVerificationButton')).tap();

  await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
  await element(by.id('VerificationCodeButton')).tap();

  await element(by.text('Ja')).tap();

  await element(by.id('VerificationCodeInput')).typeText('000000');

  await waitFor(element(by.text('Später')))
    .toBeVisible()
    .withTimeout(20000);
  await element(by.text('Später')).tap();

  await element(by.id('BurgerMenuButton')).tap();
};
