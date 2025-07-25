import { BooleanInput } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user',
    standalone     : true,
    imports        : [MatButtonModule, MatMenuModule, NgIf, MatIconModule, MatDividerModule],
})
export class UserComponent implements OnInit, OnDestroy
{
    static readonly ngAcceptInputType_showAvatar: BooleanInput;
    @Input() showAvatar: boolean = true;
    user: User;

    private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly _userService: UserService,
        private readonly _authService: AuthService
    )
    {
    }

    ngOnInit(): void
    {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) =>
            {
                this.user = user;
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    updateUserStatus(status: string): void
    {
        if ( !this.user )
        {
            return;
        }
        this._userService.update({
            ...this.user,
            status,
        }).subscribe();
    }

    signOut(): void
    {
        this._authService.signOut();
        window.location.href = environment.contextPath + '/sign-in';
    }
}
