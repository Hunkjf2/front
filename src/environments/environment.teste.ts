import packageJson from '../../package.json';

export const environment = {
    production: false,
    serverUrl: 'https://qa.techlead.com.br/sso-igepps-api',
    version: packageJson.version,
    name: 'teste',
    systemName: packageJson.name,
    contextPath: '/sso-igepps',
};