![Vueware](https://www.vueware.nl/logo.png)

# @vueware/csv-parser

`@vueware/csv-parser` is a simple TypeScript library that converts CSV files into an array of JSON objects. It supports no headers, custom delimiters and includes basic error handling.

## Installation

Install via npm:

```bash
npm install @vueware/csv-parser
```

## Usage

Import and use the `parse` function to convert your CSV file:

```bash
import { parse } from "@vueware/csv-parser";

const data = parse("path/to/file.csv");
console.log(data);
```

## Parameters:

- `filePath` (string): Path to the CSV file.
- `delimiter` (optional, string): The delimiter for columns (default is comma).
