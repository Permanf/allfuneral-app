import { Suspense, lazy} from "react";
import { Route, Routes } from "react-router-dom";
import { Center, Loader } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Containers
const Layout = lazy(() => import("./layouts/layout"));
const NotFound = lazy(() => import("./pages/404"));


const queryClient = new QueryClient();

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(userLoading());
  //   let token = GetCookie("access_token_admin");
  //   if (!token) {
  //     dispatch(userLoadFailed());
  //   } else {
  //     dispatch(loginSuccess(token));
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Center className="h-screen"> <Loader /></Center> }>
        <Routes>
          <Route
            path="/*"
            element={<Layout />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
