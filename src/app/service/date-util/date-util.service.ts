import {Injectable} from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears
} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor() {
  }

  getDiffToNow(startDate: string | number | Date): string {
    let result = '';
    const now = new Date();
    startDate = new Date(startDate);

    const yearsDiff = differenceInYears(now, startDate);
    if (yearsDiff > 0) {
      result = yearsDiff + ' năm trước';
      return result;
    }

    const monthsDiff = differenceInMonths(now, startDate);
    if (monthsDiff > 0) {
      result = monthsDiff + ' tháng trước';
      return result;
    }

    const daysDiff = differenceInDays(now, startDate);
    if (daysDiff > 0) {
      result = daysDiff + ' ngày trước';
      return result;
    }

    const hoursDiff = differenceInHours(now, startDate);
    if (hoursDiff > 0) {
      result = hoursDiff + ' giờ trước';
      return result;
    }

    const minutesDiff = differenceInMinutes(now, startDate);
    if (minutesDiff > 0) {
      result = minutesDiff + ' phút trước';
      return result;
    }

    const secondsDiff = differenceInSeconds(now, startDate);
    if (secondsDiff > 0) {
      result = secondsDiff + ' giây trước';
      return result;
    }
  }

}
