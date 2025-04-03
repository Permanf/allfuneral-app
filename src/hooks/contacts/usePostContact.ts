import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../store/api";

const postFunc = async (id: string, post_data: any) => {
  const { data } = await api.post({ url: `/contacts/${id}`, params:post_data, method: "PATCH"});
  return data;
};

export const usePostContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, post_data }: { id: string; post_data: any }) => postFunc(id, post_data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
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