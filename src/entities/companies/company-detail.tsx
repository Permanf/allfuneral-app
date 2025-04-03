import { Button, MultiSelect, Select, TextInput } from "@mantine/core"
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react"
import { useEffect, useReducer } from "react";
import { IndexReducer } from "./actions";
import { usePostCompany } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { DateFormatter } from "../../utils/date";
import { DateInput } from '@mantine/dates';
import { FormData, ICompanyDetailProps } from "../../types/company.interface";

export const CompanyDetail = ({companyDetail}: ICompanyDetailProps) =>{
    const [state, setState] = useReducer(IndexReducer, {
        loading: false,
        statusForm: '',
    });
    const postMutation = usePostCompany();
    const {handleSubmit, formState: { errors }, control, setValue} = useForm({resolver: yupResolver(schema)});
    useEffect(() => {
        setValue('no', companyDetail?.contract?.no);
        setValue('issue_date', new Date(companyDetail?.contract?.issue_date));
        setValue('businessEntity', companyDetail?.businessEntity);
        setValue('type', companyDetail?.type);
    }, [state.statusForm]);

    const onSubmit = (data: FormData) => {
        let post_data = {
            contract: {
                no: data.no,
                issue_date: new Date(data.issue_date).toISOString(),
            },
            businessEntity: data.businessEntity,
            type: data.type
        }
        setState({ type: "SET_LOADING", payload: true });
        postMutation.mutate({id: companyDetail?.id, post_data})
    }

    useEffect(()=>{
        if (postMutation.isSuccess){
            setState({ type: "SET_LOADING", payload: false });
            setState({ type: "STATUS_FORM", payload: "" });
        }
        if (postMutation.isError){
            setState({ type: "SET_LOADING", payload: false });
            setState({ type: "STATUS_FORM", payload: "" });
        }
    },[postMutation.status])
    return(
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full flex flex-col justify-center items-center mt-[32px] rounded-2xl shadow-md p-[24px] border border-gray-100">
            <div className="w-full flex justify-between items-center">
                <span className="text-sm font-bold">Company Details</span>
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
            {state.statusForm == ''
            ?
            <div className="w-full flex flex-col mt-[16px] space-y-[1.1rem]">
                <div className="w-full flex">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Agreement:</span>
                    <div className="flex text-sm font-normal">
                        {companyDetail?.contract?.no} 
                        <span className="text-gray-500 mx-2">/</span> 
                        {DateFormatter(companyDetail?.contract?.issue_date)}
                    </div>
                </div>
                <div className="w-full flex">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Business entity:</span>
                    <span className="text-sm font-normal">{companyDetail?.businessEntity}</span>
                </div>
                <div className="w-full flex">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Company type:</span>
                    <div className="flex text-sm font-normal">
                        {companyDetail?.type?.map((item:string, index:number)=>(
                            <span className="first-letter:uppercase ml-1"> {item} {index +1 == companyDetail?.type?.length ? "" : "," } </span>
                        ))}
                    </div>
                </div>
            </div>
            :
            <div className="w-full flex flex-col mt-[16px] space-y-[0.5rem]">
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Agreement:</span>
                    <div className="flex items-center ml-3">

                    <Controller
                    control={control}
                    name="no"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        error={errors?.no?.message}
                        />
                    );
                    }}
                    />
                    <span className="text-sm text-[#00000080] font-normal ml-3 mr-2">Date:</span>
                    <Controller
                    control={control}
                    name="issue_date"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <DateInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        valueFormat="DD.MM.YYYY"
                        error={errors?.issue_date?.message}
                        />
                    );
                    }}
                    />
                    </div>

                </div>
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Business entity:</span>
                    <Controller
                    control={control}
                    name="businessEntity"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <Select
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        data={[
                            "Sole Proprietorship",
                            "Partnership",
                            "Limited Liability Company"
                        ]}
                        error={errors?.businessEntity?.message}
                        className="w-full"
                        />
                    );
                    }}
                    />
                </div>
                <div className="w-full flex items-center">
                    <span className="text-sm text-[#00000080] font-normal w-[160px]">Company type:</span>
                    <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <MultiSelect
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        data={[
                            {value:"funeral_home",label:"Funeral Home"},
                            {value:"logistics_services",label:"Logistics services"},
                            {value:"burial_care_contractor",label:"Burial care Contractor"},
                        ]}
                        error={errors?.type?.message}
                        className="w-full"
                        />
                    );
                    }}
                    />
                </div>
            </div>
            }
        </form>
    )
}

const schema = Yup.object().shape({
    no: Yup.string().required("Nomer required"),
    issue_date: Yup.date().required("Issue date required"),
    businessEntity: Yup.string().required("Phone required"),
    type: Yup.array().required("Type required"),
});