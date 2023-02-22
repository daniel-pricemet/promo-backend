import { validateSync } from 'class-validator';

export const validate = (dto: object) => {
  const validationResults = validateSync(dto);

  if (validationResults.length > 0) {
    const mapped = validationResults.map((error) => ({
      ...error,
      isValidationError: true,
    }));

    throw mapped;
  }
};
