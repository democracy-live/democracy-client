import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface InitialStateInterface {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  countdown: number;
  setResendTime: (value: string) => void;
  expireTime: Date;
  setExpireTime: (value: string) => void;
  remove: () => void;
}

const defaults: InitialStateInterface = {
  phoneNumber: '',
  setPhoneNumber: () => {
    throw new Error(
      'VerificationContext: setPhoneNumber function is not defined',
    );
  },
  countdown: 0,
  setResendTime: () => {
    throw new Error(
      'VerificationContext: setResendTime function is not defined',
    );
  },
  setExpireTime: () => {
    throw new Error(
      'VerificationContext: setExpireTime function is not defined',
    );
  },
  expireTime: new Date(),
  remove: () => {
    throw new Error('VerificationContext: remove function is not defined');
  },
};

export const VerificationContext = createContext<InitialStateInterface>(
  defaults,
);

export const VerificationProvider: FC = ({ children }) => {
  const [phoneNumber, setPhoneNumberValue] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [resendTime, setResendTimeValue] = useState<Date>(new Date());
  const [expireTime, setExpireTimeValue] = useState<Date>(new Date());

  useEffect(() => {
    AsyncStorage.getItem('verification_code_resend_time').then((value) =>
      value ? setResendTimeValue(new Date(value)) : undefined,
    );
    AsyncStorage.getItem('verification_code_expire_time').then((value) =>
      value ? setExpireTimeValue(new Date(value)) : undefined,
    );
    AsyncStorage.getItem('verification_tmp_phone_number').then((value) => {
      value ? setPhoneNumberValue(value) : '';
    });
  }, []);

  useEffect(() => {
    let countdownValue = Math.ceil(
      (resendTime.getTime() - new Date().getTime()) / 1000,
    );
    if (countdownValue > 0) {
      const countdownInterval = setInterval(() => {
        countdownValue = Math.ceil(
          (resendTime.getTime() - new Date().getTime()) / 1000,
        );
        setCountdown(countdownValue);
        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
      return () => {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
      };
    }
  }, [resendTime]);

  useEffect(() => {
    AsyncStorage.setItem('verification_tmp_phone_number', phoneNumber);
  }, [phoneNumber]);

  const setPhoneNumber = (value: string) => {
    if (value) {
      AsyncStorage.setItem('verification_code_resend_time', value).then(() => {
        setPhoneNumberValue(value);
      });
    }
  };

  const setResendTime = (value: string) => {
    if (value) {
      AsyncStorage.setItem('verification_code_resend_time', value).then(() => {
        setResendTimeValue(new Date(value));
      });
    }
  };

  const setExpireTime = (value: string) => {
    AsyncStorage.setItem('verification_code_expire_time', value).then(() => {
      setExpireTimeValue(new Date(value));
    });
  };

  const remove = () => {
    AsyncStorage.multiRemove([
      'auth_token',
      'auth_refreshToken',
      'auth_phoneHash',
    ]);
  };

  return (
    <VerificationContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        countdown,
        expireTime,
        setResendTime,
        setExpireTime,
        remove,
      }}>
      {children}
    </VerificationContext.Provider>
  );
};
