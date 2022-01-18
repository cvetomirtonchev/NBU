import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usersSortingFilter'
})

export class UsersSortFilterPipe implements PipeTransform {
    transform(value: any[], ...args: [string]): any[] {
        const result: any[] = [];
        value.forEach(obj => {
            let filteredByFacultyNumber: any;
            let filteredByFirstName: any;
            let filteredByUserName: any;
            let filteredByEmail: any;
            if (obj.facultyNumber) {
                if (obj.facultyNumber.toString().startsWith(args[0])) {
                    filteredByFacultyNumber = obj.facultyNumber;
                } else {
                    filteredByFacultyNumber = obj.facultyNumber.toString().includes(args[0]);
                }
            }
            if (obj.firstName.toLowerCase().startsWith(args[0].toLowerCase())) {
                filteredByFirstName = obj.firstName;
            } else {
                filteredByFirstName = obj.firstName.toLowerCase().includes(args[0].toLowerCase());
            }
            if (obj.userName.toLowerCase().startsWith(args[0].toLowerCase())) {
                filteredByUserName = obj.userName;
            } else {
                filteredByUserName = obj.userName.toLowerCase().includes(args[0].toLowerCase());
            }
            if (obj.email.toString().startsWith(args[0])) {
                filteredByEmail = obj.email;
            } else {
                filteredByEmail = obj.email.toString().includes(args[0]);
            }
            if (filteredByFacultyNumber ||
                filteredByFirstName.length ||
                filteredByUserName.length ||
                filteredByEmail.length) {
                result.push(obj);
            }
        });
        return result;
    }
}
