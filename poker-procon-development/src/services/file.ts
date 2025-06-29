import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { generateErrorObject } from '@/utils';

class FileService {
  public static mkDir(dir: string) {
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [generateErrorObject('BC001')],
          target: { dir },
        })
      );
    }
  }

  public static readDir(dir: string) {
    try {
      if (!fs.existsSync(dir)) FileService.mkDir(dir);

      return fs.readdirSync(dir);
    } catch (e) {
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [generateErrorObject('BC002')],
          target: { dir },
        })
      );
    }
  }

  public static writeFile(dir: string, file: string, data: any) {
    try {
      if (!fs.existsSync(dir)) FileService.mkDir(dir);

      const fullPath = path.join(dir, file);
      fs.writeFileSync(fullPath, data);
    } catch (e) {
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [generateErrorObject('BC003')],
          target: { dir, file, data },
        })
      );
    }
  }

  public static readFile(dir: string, file: string) {
    try {
      const fullPath = path.join(dir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return matterResult.content;
    } catch (e) {
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [generateErrorObject('BC004')],
          target: { dir, file },
        })
      );
    }
  }
}

export default FileService;
