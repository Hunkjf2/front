import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'usuario/listar'},
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'login', loadChildren: () => import('app/modules/auth/login/login.routes')},
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'usuario', loadChildren: () => import('app/modules/usuario/usuario.routes')},
            {path: 'perfil', loadChildren: () => import('app/modules/perfil/perfil.routes')},
            {path: 'sistema', loadChildren: () => import('app/modules/sistema/sistema.routes')},
        ]
    }
];
