import { by, device, expect, element, init, waitFor } from 'detox';
import {
  clickThrowInstructions,
  verifyBySidemenu,
  getRandomNumber,
} from '../helpers';
const config = require('../../package.json').detox;

describe('Verification', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    await device.launchApp({ delete: true });

    // click throw instructions
    await clickThrowInstructions();
  });

  it('Basic auth', async () => {
    await verifyBySidemenu();
    await element(by.id('BurgerMenuButton')).tap();
    await expect(element(by.text('verifizierter Nutzer'))).toBeVisible();
  });

  it('Szenario 1: Verifizieren via BurgerMenu/Profil', async () => {
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('unverifizierter Nutzer')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();

    await waitFor(element(by.id('VerificationCodeInput')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await waitFor(element(by.text('Später')))
      .toBeVisible()
      .withTimeout(20000);

    await element(by.text('Später')).tap();

    await expect(element(by.text('verifizierter Nutzer'))).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  it('Szenario 2: Verifizieren via BurgerMenu/Settings', async () => {
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('Settings')).tap();
    await waitFor(element(by.text('Verifizieren')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.text('Verifizieren')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('Verifiziert'))).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  it('Szenario 3: Verifizieren via Abstimmen', async () => {
    try {
      await element(by.label('VERGANGEN VERGANGEN')).tap();
    } catch (error) {
      await element(by.id('tabBarPastItem')).tap();
    }

    await element(by.id('ListItem-PAST-1')).tap();

    await element(by.id('ProcedureScrollView')).scrollTo('bottom');

    await element(by.id('VerificationTouch')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('VerificationTouch'))).toBeNotVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  it('Szenario 4: Verifizieren with quit app before code input', async () => {
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('unverifizierter Nutzer')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();

    await device.launchApp({ newInstance: true });

    await waitFor(element(by.id('BurgerMenuButton')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('unverifizierter Nutzer')).tap();

    await waitFor(element(by.text('CODE EINGEBEN')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.text('CODE EINGEBEN')).tap();

    await waitFor(element(by.id('VerificationCodeInput')))
      .toBeVisible()
      .withTimeout(20000);
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('verifizierter Nutzer'))).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });
});
