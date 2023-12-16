import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TodoDispatchContext } from "../context/Context";
import api from "../utils/baseUrl";


const useFetchNotes = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL

    const dispatch = useContext(TodoDispatchContext);

    api
        .get(`/api/showtodo`)
        .then((response) => {
            console.log("notes->", response?.data);
            dispatch({ type: "ADD_TODOS", payload: response?.data })
        })
        .catch((error) => {
            console.log(error);
        });
};

export default useFetchNotes;