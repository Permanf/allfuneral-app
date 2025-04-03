import { AppShell, ScrollArea, Loader, Center} from "@mantine/core";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import { routes_content } from "../routes";
import { Sidebar } from "../entities";

export default function Layout() {
    return (
      <>
      <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm'
      }}
      >
        <AppShell.Navbar>
          <AppShell.Section grow component={ScrollArea}>
            <Sidebar />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main component={ScrollArea} className="bg-white border-none">
          <Suspense fallback={<Center className="w-full justify-center h-screen"> <Loader /> </Center>}>
            <Routes>
              {routes_content()?.map((route:any, idx:number) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route?.path}
                        element={<route.element />}
                      />
                    )
                  );
              })}
              <Route path="/" element={<Navigate to="home" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
        </AppShell.Main>
      </AppShell>
      </>
    );
}