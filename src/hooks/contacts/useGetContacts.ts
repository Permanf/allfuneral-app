import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getFunc = async ({state}: {state:{id: string}}) => {
    const { data } = await api.get({ url:`/contacts/${state.id}`});
    return data;
};

export function useGetContacts({state}:{state:{id: string}}) {
    return useQuery({
        queryKey: ['contacts', state],
        queryFn: () => getFunc({ state }),
    });
}