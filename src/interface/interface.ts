import { Gender, System } from "../constants/constants";

interface IData {
  [brand: string]: {
    men: {
      cm: {
        men: string[];
        women: string[];
      };
      eu: {
        men: string[];
        women: string[];
      };
      uk: {
        men: string[];
        women: string[];
      };
      us: {
        men: string[];
        women: string[];
      };
    };
    women: {
      cm: {
        men: string[];
        women: string[];
      };
      eu: {
        men: string[];
        women: string[];
      };
      uk: {
        men: string[];
        women: string[];
      };
      us: {
        men: string[];
        women: string[];
      };
    };
  };
}

interface IConvertFrom {
  brand: string;
  gender: Gender;
  system: System;
  size: string;
}

interface IConvertTo {
  brand: string;
  gender: Gender;
  system: System;
}

interface IConvert {
  from: IConvertFrom;
  to: IConvertTo;
}

export { IData, IConvertFrom, IConvertTo, IConvert };
