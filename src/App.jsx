import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { lazy } from "react";
import { Suspense } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Homepage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// dist/assets/index-8d8aa8e9.css   30.25 kB │ gzip:   5.07 kB
// dist/assets/index-d129bc23.js   523.28 kB │ gzip: 153.90 kB

// after lazy loading implementation

// dist/assets/Logo-81b2c976.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-b7d792c3.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-9f395e2d.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-b91bce59.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-342f70c0.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-359bc80b.css           26.58 kB │ gzip:   4.39 kB
// dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-d8002695.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-f7f7747d.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-1b4a503e.js           0.50 kB │ gzip:   0.27 kB
// dist/assets/Pricing-9eb186ca.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-1026a89c.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-3a3c8902.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-9fc47d4a.js             1.00 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-66c0d40a.js       156.94 kB │ gzip:  46.18 kB
// dist/assets/index-6af33098.js           363.90 kB │ gzip: 106.75 kB

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Navigate replace to="cities" />} />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route path="countries" element={<CountryList />} />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
