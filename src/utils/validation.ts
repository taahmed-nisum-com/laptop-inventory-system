
export interface ValidationError {
    details: {
        message: string,
    }[]
}

export type ValidationResult<T> ={
    error: undefined;
    value: T;
} | {
    error: ValidationError;
    value: undefined;
}
export function validateScreenSize(screenSize: string): ValidationResult<string>{
    debugger
    const validScreenSizes = ["14", "15", "15.6", "16", "17"];
    const validStrings = ["inch", "inches"];
  
    const screenSizeRegex = new RegExp(`^(${validScreenSizes.join('|')})\\s*(${validStrings.join('|')})$`, 'i');
  
    if (screenSizeRegex.test(screenSize)) {
      return { error: undefined, value: screenSize };
    } else {
      return {
        error: {
          details: [{ message: 'Screen size is not correct. Please use formats like "14-inch", "15.6 inches", etc.' }]
        },
        value: undefined
      };
    }
}


export function validateRAM(ram: string): ValidationResult<string> {
    const validSizes = ['2', '4', '8', '16', '32', '64'];
    const validUnits = ['gb', 'tb', 'GB', 'TB'];
  
    const regex = new RegExp(`^(${validSizes.join('|')})\\s*(${validUnits.join('|')})$`, 'i');
  
    if (regex.test(ram.trim())) {
      return { error: undefined, value: ram.trim().toUpperCase() };
    } else {
      return {
        error: { details: [{ message: 'RAM size is not correct' }] },
        value: undefined,
      };
    }
  }