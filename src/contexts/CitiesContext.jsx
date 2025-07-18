import { useEffect } from "react";
import { useReducer } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = { cities: [], isLoading: false, currentCity: {}, error: "" };
function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            };
        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error(`Unknown action type in CitiesContext ${action.type}`);
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        const fetchCities = async () => {
            try {
                dispatch({ type: "loading" });
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (err) {
                dispatch({ type: "rejected", payload: "There was an error loading data..." });
            }
        };

        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;
            try {
                dispatch({ type: "loading" });
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json();
                dispatch({ type: "city/loaded", payload: data });
            } catch (err) {
                dispatch({ type: "rejected", payload: "There was an error loading individual city data..." });
            }
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: "There was an error while creating new city..." });
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({ type: "loading" });
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatch({ type: "rejected", payload: "There was an error while deleting city..." });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
                error,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of CitiesProvider");
    return context;
}

export { CitiesProvider, useCities };
