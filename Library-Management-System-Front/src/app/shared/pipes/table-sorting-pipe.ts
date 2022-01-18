import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableSortingFilter'
})

export class TableSortFilterPipe implements PipeTransform {
    transform(value: any[], ...args: [string]): any[] {
        const result: any[] = [];
        value.forEach(obj => {
            let filteredById: any[] = [];
            let filteredByTitle: any[] = [];
            let filteredByCategory: any[] = [];
            let filteredByStudentName: any[] = [];

            if (obj.id.toString().startsWith(args[0])) {
                filteredById = obj.id;
            } else {
                filteredById = obj.id.toString().includes(args[0]);
            }
            if (obj.bookTitle.toLowerCase().startsWith(args[0].toLowerCase())) {
                filteredByTitle = obj.bookTitle;
            } else {
                filteredByTitle = obj.bookTitle.toLowerCase().includes(args[0].toLowerCase());
            }
            if (obj.categoryName.toLowerCase().startsWith(args[0].toLowerCase())) {
                filteredByCategory = obj.categoryName;
            } else {
                filteredByCategory = obj.categoryName.toLowerCase().includes(args[0].toLowerCase());
            }
            if (obj.studentName) {
                if (obj.studentName.toLowerCase().startsWith(args[0].toLowerCase())) {
                    filteredByStudentName = obj.studentName;
                } else {
                    filteredByStudentName = obj.studentName.toLowerCase().includes(args[0].toLowerCase());
                }
            }
            if (filteredByTitle.length || filteredByCategory.length || filteredById) {
                result.push(obj);
            }
        });
        return result;
    }
}
