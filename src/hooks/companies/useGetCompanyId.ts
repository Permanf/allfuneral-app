import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getFunc = async () => {
    const { data } = await api.get({ url: `/companies/12`});
    return data;
};

export function useGetCompanyId() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => getFunc(),
    });
}