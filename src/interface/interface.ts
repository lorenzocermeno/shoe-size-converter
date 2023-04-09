interface IData {
  [brand: string]: {
    [system: string]: {
      men: string[];
      women: string[];
    };
  };
}

interface IConvertFrom {
  brand: string;
  system: string;
  gender: string;
  size: string;
}

interface IConvertTo {
  brand: string;
  system: string;
  gender: string;
}

interface IConvert {
  from: IConvertFrom;
  to: IConvertTo;
}

export { IData, IConvertFrom, IConvertTo, IConvert };
