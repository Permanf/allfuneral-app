export interface ICompanyDetailProps {
    companyDetail:{
        id: string;
        contract:{
            no: string;
            issue_date: string;
        }
        businessEntity: string;
        type: string[];
    }
}

export interface FormData{
    no: string;
    issue_date: Date;
    businessEntity: string;
    type: string[]
}

export interface IPhoto{
    name: string;
    thumbpath: string;
}
export interface ICompanyImagesProps {
    id: string;
    photos: IPhoto[]
}