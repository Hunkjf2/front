import packageJson from '../../package.json';

export const environment = {
    production: false,
    serverUrl: 'http://localhost:3000',
    version: packageJson.version,
    name: 'local',
    systemName: packageJson.name,
    contextPath: '/sso-igepps',
};