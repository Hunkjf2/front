import packageJson from '../../package.json';

export const environment = {
    production: false,
    serverUrl: 'https://dev.techlead.com.br/sso-igepps-api',
    version: packageJson.version,
    name: 'develop',
    systemName: packageJson.name,
    contextPath: '/sso-igepps',
};