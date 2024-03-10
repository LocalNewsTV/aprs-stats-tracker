import AprsEntryType from "../types/AprsEntryType";
import AprsEntryTypeRaw from "../types/AprsEntryTypeRaw";

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
      fr.onload = async (res) => {
        const fileData = res.target?.result;
        if (typeof fileData !== 'string') {
          reject(new Error("Invalid JSON File"));
        } else {
          const input = this.format(JSON.parse(fileData));
          resolve(input);
        }
      };
      fr.onerror = (err) => { reject(err); };
      fr.readAsText(file);
    });
  }
  static format = (data: Array<AprsEntryTypeRaw>): Array<AprsEntryType> => (
    data.map((item: AprsEntryTypeRaw) => {
      const newItem = {} as AprsEntryType;
      newItem.time = parseInt(item.time);
      newItem.lasttime = parseInt(item.lasttime);
      newItem.course = parseInt(item.course);
      newItem.lat = parseFloat(item.lat);
      newItem.lng = parseFloat(item.lng);
      newItem.altitude = parseFloat(item.altitude);
      newItem.speed = parseInt(item.speed);
      return newItem;
    })
  )
  
}

export default JSONFileParser;
