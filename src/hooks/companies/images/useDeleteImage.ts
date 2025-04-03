import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../../store/api";

const deleteFunc = async (id: number | string, image_name: string) => {
  const { data } = await api.delete({ url:`/companies/${id}/image/${image_name}`});
  return data;
};

export const useDeleteCompanyImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, image_name }: { id: string; image_name: string }) => deleteFunc(id, image_name),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['images'] });
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