import { Button, Modal, Text } from "@mantine/core";
import { IDeleteModalProps } from "../../../types/delete-modal.interface";

export const DeleteModal = ({modal, setModal, remove_id, deleteMutation}: IDeleteModalProps) =>{  
    return(
        <Modal
            opened={modal}
            centered
            onClose={() => {
                setModal(false);
            }}
            overlayProps={{
                opacity: 0.55,
            }}
            radius={8}
        >
            <Text size="xl" mb={12} ta="center" >Remove the Organization?</Text>
            <Text size="md" mb={24} ta="center" >Are you sure you want to remove this Organozation?</Text>
            <div className="flex">
                <Button
                    onClick={() => setModal(false)}
                    w={"50%"}
                    mr={16}
                    variant="default"
                >
                    No
                </Button>
                <Button
                    onClick={() => {
                        setModal(false);
                        deleteMutation.mutate(remove_id)
                    }}
                    w={"50%"}
                >
                    Yes, remove
                </Button>
            </div>
        </Modal>
    )
}