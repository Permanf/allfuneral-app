import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../../store/api";

const postFunc = async (id: string, post_data: any) => {
  const { data } = await api.upload({ url: `/companies/${id}/image`, formData:post_data });
  return data;
};

export const usePostCompanyImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, post_data }: { id: string; post_data: any }) => postFunc(id, post_data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
    onError: (err: any) => {
      notifications.show({
        color: "red",
        title: "An error occurred!",
        message: err.response.data?.error,
      })
      console.log(JSON.stringify(err.response.data));
      },
  });
};