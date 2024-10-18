import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import CreateCarPage from "./pages/CreateCarPage";
import MainLayout from "./layouts/MainLayout";
import ReadCarPage from "./pages/ReadCarPage";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ManufacturerDashboard />} />
          <Route path="/read-car" element={<ReadCarPage />} />
          <Route path="/create-car" element={<CreateCarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
