import { Button, TextInput } from "@mantine/core"
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react"
import { usePostContact } from "../../hooks";
import { useEffect, useReducer} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { IndexReducer } from "./actions";
import { FormData, IContactProps } from "../../types/contact.interface";

export const Contact = ({contact}:IContactProps) => {
    const [state, setState] = useReducer(IndexReducer, {
        loading: false,
        statusForm: '',
    });
    const postMutation = usePostContact();
    const {handleSubmit, formState: { errors }, control, setValue} = useForm({resolver: yupResolver(schema)});
    useEffect(() => {
        setValue('name', contact?.firstname + " " + contact?.lastname);
        setValue('phone', "+ " + contact?.phone);
        setValue('email', contact?.email);
    }, [contact?.id]);

    const onSubmit = (data: FormData) => {
        let post_data = {
            firstname: data.name.split(" ")[0],
            lastname: data.name.split(" ")[1],
            phone: data.phone.split(" ")[1],
            email: data.email
        }
        setState({ type: "SET_LOADING", payload: true });
        postMutation.mutate({id: contact?.id, post_data})
    }

    useEffect(()=>{
        if (postMutation.isSuccess){
          setState({ type: "SET_LOADING", payload: false });
            setState({ type: "STATUS_FORM", payload: "" });
        }
      },[postMutation.status])

    return(
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full flex flex-col justify-center items-center mt-[16px] rounded-2xl shadow-md p-[24px] border border-gray-100"
        >
            <div className="w-full flex justify-between items-center">
                <span className="text-sm font-bold">Contacts</span>
                {state.statusForm == ''
                ?
                <Button 
                radius={"md"} 
                variant="default" 
                leftSection={<IconPencil size={20} stroke={1.5} />}
                onClick={()=>{
                    setState({ type: "STATUS_FORM", payload: "edit" });
                }}
                >
                    Edit
                </Button>
                :
                <div className="flex space-x-2">
                    <Button
                    type="submit"
                    radius={"md"} 
                    variant="default" 
                    leftSection={<IconCheck size={20} stroke={1.5} />}
                    loading={state.loading}
                    >
                        Save changes
                    </Button>
                    <Button 
                    radius={"md"} 
                    variant="default" 
                    leftSection={<IconX size={20} stroke={1.5} />}
                    onClick={()=>{
                        setState({ type: "STATUS_FORM", payload: "" });
                    }}
                    >
                        Cancel
                    </Button>
                </div>
                }
            </div>
            <div className="w-full flex flex-col mt-[16px] space-y-[0.5rem]">
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Responsible person:</span>
                    <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        error={errors?.name?.message}
                        variant={state.statusForm == "" ? "unstyled" : "default"}
                        />
                    );
                    }}
                    />
                </div>
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Phone number:</span>
                    <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        error={errors?.phone?.message}
                        variant={state.statusForm == "" ? "unstyled" : "default"}
                        />
                    );
                    }}
                    />
                </div>
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">E-mail:</span>
                    <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        error={errors?.email?.message}
                        variant={state.statusForm == "" ? "unstyled" : "default"}
                        />
                    );
                    }}
                    />
                    {/* <span className="text-sm font-normal">{contact.email}</span> */}
                </div>
            </div>
        </form>
    )
}

const schema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    phone: Yup.string().required("Phone required"),
    email: Yup.string().required("Email required"),
});