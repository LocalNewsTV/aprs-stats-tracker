import AprsEntryType from "../types/AprsEntry";

class JSONFileParser {
  
  /** 
   * @param file File in question 
   * @returns if file is .json
   */
  static isJsonFile = (file: File): boolean => file.type === "application/json" 

  /**
   * @desc 
   * @param file Designated file
   * @returns {Array<AprsEntryType>} Parsed Aprs Data used by web application
   */
  static parse = async (file: File): Promise<Array<AprsEntryType>>  => {
    return new Promise<Array<AprsEntryType>>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = (res) => {
        const fileData = res.target?.result;
        if (typeof fileData !== 'string') {
          reject(new Error("Invalid JSON File"));
        } else {
          const input = JSON.parse(fileData);
          resolve(input);
        }
      };
      fr.onerror = (err) => { reject(err); };
      fr.readAsText(file);
    });
  }
  
}

export default JSONFileParser;
