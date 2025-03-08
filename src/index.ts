import { readFileSync } from "fs";

export const parse = (filePath: string, delimiter?: string): any[] => {
  try {
    // Read the file content
    const data = readFileSync(filePath, "utf-8");
    if (!data) {
      throw new Error("The file is empty.");
    }

    // Split the content into lines
    const [headerLine, ...lines] = data.trim().split("\n");
    if (!headerLine) {
      throw new Error("The first line (headers) is missing.");
    }

    // Split headers
    const headers = headerLine
      .split(delimiter || ",")
      .map((header) => header.trim());
    if (headers.length === 0) {
      throw new Error("No valid headers found.");
    }

    // Function to check if a value is a valid number (without spaces)
    const parseValue = (value: string): string | number => {
      const trimmedValue = value.trim();
      return isNaN(Number(trimmedValue)) || trimmedValue.includes(" ")
        ? trimmedValue
        : Number(trimmedValue);
    };

    // Process the data
    return lines.map((line, lineIndex) => {
      const values = line.split(delimiter || ",");

      // If the line doesn't have enough values, throw an error
      if (values.length !== headers.length) {
        throw new Error(
          `Error in line ${
            lineIndex + 1
          }: the number of values does not match the number of headers.`
        );
      }

      return headers.reduce((obj, header, index) => {
        const value = parseValue(values[index] || "");
        obj[header] = value;
        return obj;
      }, {} as Record<string, string | number>);
    });
  } catch (error) {
    console.error("Error reading or processing the file:", error.message);
    return [];
  }
};
