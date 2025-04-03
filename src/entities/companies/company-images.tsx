import { Button, FileButton } from "@mantine/core"
import AddPhoto from '../../assets/add-photo.svg';
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteCompanyImage, usePostCompanyImage } from "../../hooks";
import { ICompanyImagesProps, IPhoto } from "../../types/company.interface";

export const CompanyImages = ({id, photos}: ICompanyImagesProps) => {
  const deleteMutation = useDeleteCompanyImage();
  const postMutation = usePostCompanyImage()
  const [loading, setLoading] = useState(false)

  const uploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true)
    postMutation.mutate({id, post_data: formData})
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      uploadPhoto(selectedFile);
    }
  };
  useEffect(()=>{
    if (postMutation.isSuccess){
        setLoading(false)
    }
    if (postMutation.isError){
      setLoading(false)
  }
  },[postMutation.status])
  return(
    <div className="w-full flex flex-col justify-center items-center mt-[16px] rounded-2xl shadow-md p-[24px] border border-gray-100">
    <div className="w-full flex justify-between items-center">
      <span className="text-sm font-bold">Photos</span>
        <FileButton  onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => 
            <Button radius="md"
            variant="default"
            loading={loading} 
            leftSection={<img src={AddPhoto} alt="AddPhoto" style={{ filter: "brightness(0.3)" }} />} {...props}
            >
              Add
            </Button>
          }
        </FileButton>
    </div>


    <div className="w-full flex flex-wrap mt-4 gap-4">
      {photos.map((photo: IPhoto, index:number) => (
        <div
          key={index}
          className="w-[144px] h-[108px] rounded-[8px] relative"
          style={{
            backgroundImage: `url(${photo.thumbpath})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <button 
            className="absolute top-1 right-1 flex justify-center items-center w-[28px] h-[28px] bg-[#3B3B3B] hover:bg-[#3b3b3bda] text-white rounded-full cursor-pointer "
            onClick={()=>{
              deleteMutation.mutate({id, image_name: photo.name})
            }}
            >
              <IconTrash size={18} stroke={1.5} />
            </button>
        </div>
      ))}
    </div>
  </div>
  )
}
