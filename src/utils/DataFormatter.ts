import AprsEntryType from "../types/AprsEntryType";

class DataFormatter {
  static daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
  static timeConversion = [
    '0:00', '1:00', '2:00', '3:00', '4:00', '5:00',
    '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', 
  ];

  static DayConversion(dataset: Array<AprsEntryType>) {
    const entries: Array<number> = Array(7).fill(0);
    dataset.forEach((item: AprsEntryType) => {
      entries[new Date(item.time * 1000).getDay()]++
    })
    return entries;
  }
  static morningNoonOrNight = (dataSet: Array<number>) => {
    const timesOfDay = {
      morning: 0,
      noon: 0,
      night: 0, 
    }
    dataSet.forEach((item: number, index: number) => {
      if (index >= 11 && index <= 16) {
        timesOfDay.noon += item;
      } else if (index > 16 || index <= 4) {
        timesOfDay.night += item;
      } else { timesOfDay.morning += item; }
    })
    const { morning, noon, night } = timesOfDay;
    if(morning > noon && morning > night) { return "Morning"; }
    if(noon > morning && noon > night) { return "Afternoon"; }
    return "Night";
  }
  static HourConversion(dataset: Array<AprsEntryType>) {
    const entries: Array<number> = Array(24).fill(0);
    dataset.forEach((item: AprsEntryType) => {
      entries[new Date(item.time * 1000).getHours()]++
    })
    return entries;
  }
}

export default DataFormatter;
