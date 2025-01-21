import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './index.css'
import HomeLayout from './layouts/HomeLayout'
import ReposFavoritosRoute from './routes/ReposFavoritosRoute'
import ReposMeusRoute from './routes/ReposMeusRoute'
import ReposPublicosRoute from './routes/ReposPublicosRoute'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/repos/publicos" replace />}
                />

                <Route element={<HomeLayout />}>
                    <Route
                        path="/repos/publicos"
                        element={<ReposPublicosRoute />}
                    />

                    <Route
                        path="/repos/meus"
                        element={<ReposMeusRoute />}
                    />

                    <Route
                        path="/repos/favoritos"
                        element={<ReposFavoritosRoute />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
