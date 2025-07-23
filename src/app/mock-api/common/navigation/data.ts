/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'usuario',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
              {
                id      : 'apps.sistema',
                title   : 'Sistemas',
                type    : 'collapsable',
                icon    : 'heroicons_outline:computer-desktop',
                children: [
                    {
                        id   : 'sistema.listar',
                        title: 'Listar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/sistema/listar',
                    },
                    {
                        id   : 'sistema.cadastrar',
                        title: 'Cadastrar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/sistema/cadastrar',
                    },
                ],
            },
            {
                id      : 'apps.usuario',
                title   : 'Usuário',
                type    : 'collapsable',
                icon    : 'heroicons_outline:user',
                children: [
                    {
                        id   : 'usuario.listar',
                        title: 'Listar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/usuario/listar',
                    },
                    {
                        id   : 'usuario.cadastrar',
                        title: 'Cadastrar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/usuario/cadastrar',
                    },
                ],
            },
            {
                id      : 'apps.perfil',
                title   : 'Perfil',
                type    : 'collapsable',
                icon    : 'heroicons_outline:users',
                children: [
                    {
                        id   : 'perfil.listar',
                        title: 'Listar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/perfil/listar',
                    },
                    {
                        id   : 'perfil.cadastrar',
                        title: 'Cadastrar',
                        type : 'basic',
                        icon : 'heroicons_outline:bars-2',
                        link : '/perfil/cadastrar',
                    },
                ],
            },
        ],
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
