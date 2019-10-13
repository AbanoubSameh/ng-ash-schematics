export interface schema {
    name: string;
    path?: string;
    appRoot?: string;
    sourceDir?: string;
    flat?: boolean;
    spec?: boolean;
    CRUD?: boolean;
}