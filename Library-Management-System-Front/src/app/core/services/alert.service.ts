import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../../shared/models/alert';


@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';
    constructor(private toastr: ToastrService) { }
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(title: string, message?: string) {
        this.toastr.success(
            `${title}`,
            `${message ? message : ''}`,
            {
                enableHtml: true,
                progressBar: true
            });
        // this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(title: string, message?: string) {
        this.toastr.error(
            `${title}`,
            `${message ? message : ''}`,
            {
                enableHtml: true,
                progressBar: true
            });
        // this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(title: string, message?: string) {
        this.toastr.info(
            `${title}`,
            `${message ? message : ''}`,
            {
                enableHtml: true,
                progressBar: true
            });
        // this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(title: string, message?: string) {
        this.toastr.warning(
            `${title}`,
            `${message ? message : ''}`,
            {
                enableHtml: true,
                progressBar: true
            });
        //  this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}