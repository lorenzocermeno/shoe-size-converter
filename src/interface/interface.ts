import { Gender, System } from "../constants/constants";

interface ISizes {
  men: string[];
  women: string[];
}

interface ISystems {
  cm: ISizes;
  eu: ISizes;
  uk: ISizes;
  us: ISizes;
}

interface IGenders {
  men: ISystems;
  women: ISystems;
}

interface IData {
  [brand: string]: IGenders;
}

interface IConvertionParameters {
  brand: string;
  gender: Gender;
  system: System;
  size: string;
}

type IConvertionResult = Omit<IConvertionParameters, "size">;

interface IConvert {
  from: IConvertionParameters;
  to: IConvertionResult;
}

export {
  IData,
  IConvertionParameters,
  IConvertionResult,
  IConvert,
  IGenders,
  ISystems,
  ISizes,
};
