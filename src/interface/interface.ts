interface IData {
  [brand: string]: {
    [gender: string]: {
      [system: string]: {
        men: string[];
        women: string[];
      };
    };
  };
}

interface IConvertFrom {
  brand: string;
  gender: string;
  system: string;
  size: string;
}

interface IConvertTo {
  brand: string;
  gender: string;
  system: string;
}

interface IConvert {
  from: IConvertFrom;
  to: IConvertTo;
}

export { IData, IConvertFrom, IConvertTo, IConvert };
