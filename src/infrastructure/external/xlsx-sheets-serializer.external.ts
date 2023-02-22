import { ISheetsSerializer } from 'domain/contracts/sheets-serializer.contract';
import * as xlsx from 'xlsx';

export class XlsxSheetsSerializer implements ISheetsSerializer {
  readFile(buffer: Buffer): object[] {
    const workbook = xlsx.read(buffer, { type: 'buffer', cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
  }
}
