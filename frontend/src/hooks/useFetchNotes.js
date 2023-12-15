import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TodoDispatchContext } from "../context/Context";


const useFetchNotes = () => {
    
    const dispatch = useContext(TodoDispatchContext);

        axios
            .get("/api/showtodo")
            .then((response) => {
                console.log("notes->", response?.data);
                dispatch({type: "ADD_TODOS", payload: response?.data})
            })
            .catch((error) => {
                console.log(error);
            });
};

export default useFetchNotes;