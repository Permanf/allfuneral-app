import { Button, Modal, Text, TextInput } from "@mantine/core";
import { IPostModalProps } from "../../../types/update-modal.interface";
import { useEffect, useState } from "react";

export const UpdateModal = ({modal, setModal, id, name, postMutation}: IPostModalProps) =>{
    const [value, setValue] = useState('');
    useEffect(()=>{
        setValue(name)
    },[name]) 
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
            <Text size="xl" mb={24} ta="center" >Specify the Organization's name</Text>
            <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            mb={24}
            />
            <div className="flex">
                <Button
                    onClick={() => setModal(false)}
                    w={"50%"}
                    mr={16}
                    variant="default"
                >
                    Cancel  
                </Button>
                <Button
                    onClick={() => {
                        setModal(false);
                        const post_data = {
                            name: value
                        }
                        postMutation.mutate({id, post_data})
                    }}
                    w={"50%"}
                >
                    Save changes
                </Button>
            </div>
        </Modal>
    )
}