import { Center } from "@mantine/core";

const NotFound = () => (
  <Center className="w-full h-96 flex flex-col">
    <div className="text-2xl font-bold text-gray-700">404 - Not Found</div>
    <div className="text-gray-500">The page you are looking for does not exist.</div>
  </Center>
);

export default NotFound;