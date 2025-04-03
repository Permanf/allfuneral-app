import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../store/api";

const deleteFunc = async (id: number | string) => {
  const { data } = await api.delete({ url:`/companies/${id}`});
  return data;
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteFunc(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: (err: any) => {
      notifications.show({
        color: "red",
        title: "An error occurred!",
        message: "",
      })
        console.log(JSON.stringify(err.response.data.message));
      },
  });
};