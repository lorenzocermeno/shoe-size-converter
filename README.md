# Shoe Converter :athletic_shoe:

Making it possible to convert the shoe size and gender of one brand to another

## Installation

`npm i shoe-converter`

## Usage

```typescript
import { convert, getShoeSizeData } from "shoe-converter";

const data = getShoeSizeData(); // Returns data, JSON formatted

const result = convert({
  from: {
    brand: "nike",
    system: "us",
    gender: "men",
    size: "8",
  },
  to: {
    brand: "nike",
    system: "uk",
    gender: "men",
  },
}); //Returns a string with the size converted
```

## Service

| **Parameter** | **Type** | **Description**                                                             |
| ------------- | -------- | --------------------------------------------------------------------------- |
| `brand`       | `string` | The brand of the shoe (e.g., Nike, Adidas, New Balance)                     |
| `system`      | `string` | The sizing system (e.g., eu, us, cm)                                        |
| `gender`      | `string` | The gender, as provided by the shoe makers (e.g., men, women, male, female) |
| `size`        | `string` | The size of the shoe (e.g., 41 1/3, 8, 10.5)                                |

## Behind the scenes

The provided size is converted to its length in centimeters, as provided by it's maker. That length is later used as reference to provide the equivalent size of the desired sizing system.
