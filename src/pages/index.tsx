import { Center, Loader } from "@mantine/core";
import { useGetCompanyId, useGetContacts } from "../hooks";
import { CompanyDetail, CompanyImages, CompanyName, Contact } from "../entities";


function HomePage() {
    const {data:companyDetail, isLoading} = useGetCompanyId();
    let state = {
      id:companyDetail?.contactId 
    }
    const {data: contact, isLoading: isLoadingContact} = useGetContacts({state});
    return (
      <div className={`w-full h-full flex flex-col justify-center items-center py-[40px]`}>
        {
          isLoading ? (
            <Center className="flex flex-col h-40">
              <Loader />
            </Center>
        ) :
        <div className="w-[640px]">
          <CompanyName name={companyDetail?.name} id={companyDetail?.id} />
          {
            isLoadingContact ? (
              <Center className="flex flex-col h-20">
                <Loader size={"xs"}/>
              </Center>
          ) : 
          <CompanyDetail companyDetail={companyDetail} />
          }

          <Contact contact={contact} />

          <CompanyImages id={companyDetail?.id} photos={companyDetail?.photos}/>
          
        </div>
        }
      </div>
    );
  }
  
export default HomePage;