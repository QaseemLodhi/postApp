import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {UserService, AlertService } from '../../service/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private registerService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.registerService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
