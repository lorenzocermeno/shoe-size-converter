# :athletic_shoe: Shoe Converter

Making it possible to convert the shoe size and gender of one brand to another.

[npm package](https://www.npmjs.com/package/shoe-converter)

## Installation

`npm i shoe-converter`

## Usage

```typescript
import { convert, getShoeSizeData } from "shoe-converter";

const data = getShoeSizeData(); // Returns the JSON data

const result = convert({
  from: {
    brand: "nike",
    system: "us",
    gender: "men",
    size: "8",
  },
  to: {
    brand: "adidas",
    system: "uk",
    gender: "men",
  },
}); // Returns a string of the size converted
```

## Service

| **Parameter** | **Type** | **Description**                            |
| ------------- | -------- | ------------------------------------------ |
| `brand`       | `string` | The brand of the shoe                      |
| `system`      | `string` | The sizing system                          |
| `gender`      | `string` | The gender, as provided by the shoe makers |
| `size`        | `string` | The size of the shoe                       |

## Behind the scenes

The provided size is converted to its length in centimeters.<br>That length is later used as reference to return the equivalent size of a desired brand, sizing system, and/or gender.<br>The utilised sizing data is provided by the manufacturer.
