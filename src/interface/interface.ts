import { Gender, System } from "../constants/constants";

interface IGenders {
  men: ISystems;
  women: ISystems;
}
interface ISystems {
  cm: ISizes;
  eu: ISizes;
  uk: ISizes;
  us: ISizes;
}
interface ISizes {
  men: string[];
  women: string[];
}

interface IData {
  [brand: string]: IGenders;
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
