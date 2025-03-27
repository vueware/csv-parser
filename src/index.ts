import { readFileSync } from "fs";

export const parse = (filePath: string, delimiter?: string): any[] => {
  try {
    // Read the file content
    const data = readFileSync(filePath, "utf-8");
    if (!data) {
      throw new Error("The file is empty.");
    }

    // Split the content into lines
    const lines = data.trim().split("\n");
    if (lines.length === 0) {
      throw new Error("The file contains no valid data.");
    }

    // Determine if the first line is a header
    let headers: string[];
    let dataLines: string[];

    if (lines.length === 1) {
      // If only one line exists, create generic headers
      const values = lines[0].split(delimiter || ",");
      headers = values.map((_, index) => `column${index + 1}`);
      dataLines = [lines[0]];
    } else {
      // Use the first line as headers
      headers = lines[0].split(delimiter || ",").map((header) => header.trim());
      dataLines = lines.slice(1);
    }

    // Function to check if a value is a valid number
    const parseValue = (value: string): string | number => {
      const trimmedValue = value.trim();
      return isNaN(Number(trimmedValue)) || trimmedValue.includes(" ")
        ? trimmedValue
        : Number(trimmedValue);
    };

    // Process the data
    return dataLines.map((line, _lineIndex) => {
      const values = line.split(delimiter || ",");

      // If the line doesn't have enough values, fill with empty strings
      while (values.length < headers.length) values.push("");

      return headers.reduce((obj, header, index) => {
        obj[header] = parseValue(values[index] || "");
        return obj;
      }, {} as Record<string, string | number>);
    });
  } catch (error) {
    console.error("Error reading or processing the file:", error.message);
    return [];
  }
};
