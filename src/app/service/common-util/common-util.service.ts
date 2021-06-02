import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  constructor() {
  }

  convertToSlug(str: string) {
    // New way use String.prototype.normalize() of ES6+
    // Convert all to lowercase and remove spaces at beginning and end of string
    str = str.toLowerCase().trim();

    // Convert string to combinatorial unicode
    str = str.normalize('NFD');

    // Remove accent characters
    str = str.replace(/[\u0300-\u036f]/g, '');

    // Replace character đ or Đ with d
    str = str.replace(/[đĐ]/g, 'd');

    // Remove special characters
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Remove spaces and replace them with -
    str = str.replace(/\s+/g, '-');

    // Remove consecutive -
    str = str.replace(/-+/g, '-');

    // Remove - at beginning and end of string
    str = str.replace(/^-+|-+$/g, '');

    // Return
    return str;

    /* Old way use regex
    str = str.toLowerCase().trim();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\s+/g, '-');
    return str; */
  }

}
