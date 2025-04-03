export interface IGetApi {
    url: string;
}

export interface IPostApi {
    url: string;
    params: any;
    method: string;
}

export interface IUpdateApi {
    url: string;
    params: string;
}

export interface IDeleteApi {
    url: string;
}

export interface IUploadApi {
    url: string;
    formData: any;
}