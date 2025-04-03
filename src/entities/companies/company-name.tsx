import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { DeleteModal } from "../ui/modal/delete-modal"
import { useDeleteCompany, usePostCompany } from "../../hooks";
import { useState } from "react";
import { UpdateModal } from "../ui/modal/update-modal";

export const CompanyName = ({name, id}:{ name: string, id: string}) =>{
    const deleteMutation = useDeleteCompany()
    const postMutation = usePostCompany()
    const [modal, setModal] = useState<boolean>(false);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const [remove_id, setRemove_id] = useState<string>('');

    return(
        <>
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-[32px]">
                <button className="flex justify-center items-center w-[44px] h-[44px] hover:bg-gray-100 rounded-full cursor-pointer">
                    <IconChevronLeft size={30} stroke={1.5} />
                </button>
                <h1 className="text-[28px] font-bold">{name}</h1>
            </div>

            <div className="flex items-center space-x-[32px]">
                <button 
                className="flex justify-center items-center w-[44px] h-[44px] hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => {
                    setModalUpdate(true);
                }}
                >
                    <IconPencil size={25} stroke={1.5} />
                </button>
                <button 
                className="flex justify-center items-center w-[44px] h-[44px] hover:bg-red-100 rounded-full cursor-pointer"
                onClick={() => {
                    setModal(true);
                    setRemove_id(id);
                }}
                >
                    <IconTrash size={25} stroke={1.5} color="red" />
                </button>
            </div>
        </div>
        <UpdateModal 
            modal={modalUpdate} 
            setModal={setModalUpdate}
            id={id}
            name={name}
            postMutation={postMutation}
        />
        <DeleteModal
            modal={modal} 
            setModal={setModal}
            remove_id={remove_id}
            deleteMutation={deleteMutation}
        />
        </>
    )
}