export * from './IPageData';
export * from './IFormatedPageData';

export interface IController {
    Id: number;
    Name: string;
    Password: string;
    AcessDate: string;
    Role: string;
    FullName: string;
    Email: string;
    Phone: string;
    ParCompany_Id: number;
    ParCompanyOrigin_Id: number;
    PasswordDate: string;
    UseActiveDirectory: boolean;
    IsActive: boolean;
    IsIntegration: boolean;
    ShowAllUnits: boolean;
    ParCompanyXUserSgq: any[];
    ParDepartmentXUserSgq: any;
    UnitUser: any[];
    AddDate: string;
    AlterDate: string;
}

export interface ISelectItem {
    Id: number;
    Name: string;
    Hash: string;
}

export interface IOffice extends ISelectItem {}
export interface ICompany extends ISelectItem {}
export interface ICostCenter extends ISelectItem {}
export interface IUnit extends ISelectItem {}
export interface IRegional extends ISelectItem {}
export interface ICompanyGroup extends ISelectItem {}
export interface ICluster extends ISelectItem {}
export interface IProcessGroup extends ISelectItem {}
export interface ISection extends ISelectItem {}
export interface IIndicator extends ISelectItem {}
export interface IMonitoring extends ISelectItem {}
export interface ITask extends ISelectItem {}

export interface IFilterResponse {
    processGroup: IProcessGroup[];
    cluster: ICluster[];
    companyGroup: ICompanyGroup[];
    regional: IRegional[];
    unit: IUnit[];
    costCenter: ICostCenter[];
    section: ISection[];
    office: IOffice[];
    indicator: IIndicator[];
    monitoring: IMonitoring[];
    task: ITask[];
    controller: IController[];
}

export interface IFilterFields {
    date: string;
    processGroup: string;
    cluster: string;
    companyGroup: string;
    regional: string;
    unit: string;
    costCenter: string[];
    section: string[];
    office: string[];
    indicator: string[];
    monitoring: string[];
    task: string[];
    controller: string[];
}
