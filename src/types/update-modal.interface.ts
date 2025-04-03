export interface IPostModalProps {
    modal: boolean;
    setModal: (value: boolean) => void;
    id: string;
    name: string;
    postMutation: any;
}