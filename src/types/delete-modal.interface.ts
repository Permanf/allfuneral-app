export interface IDeleteModalProps {
    modal: boolean;
    setModal: (value: boolean) => void;
    remove_id: string;
    deleteMutation: any;
}