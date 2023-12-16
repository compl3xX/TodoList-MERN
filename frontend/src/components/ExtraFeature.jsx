import { useContext } from 'react'

import { TodoDispatchContext } from "../context/Context"

import axios from 'axios'

import api from "../utils/baseUrl"



function ExtraFeature() {

    const baseUrl = import.meta.env.VITE_BASE_URL

    const dispatch = useContext(TodoDispatchContext)

    const DeleteCompTask = () => {

        api.delete(`/api/deltodo/1?deleteType=2`).then((resp) => {
            console.log("Success", resp)
        }).catch((error) => {
            console.log(error)
        })
        dispatch({
            type: 'DEL_TODO',
        })
    }

    const CompAllTask = () => {

        api.put(`/api/updatetodo/2`, { isDone: true }).then((resp) => {
            console.log('success', resp)
        }).catch((error) => {
            console.log(error)
        })

        dispatch({
            type: 'UPDATE_TODO'
        })
    }

    return (
        <div className="extra-feature">
            <button onClick={CompAllTask}>Completed All Task </button>
            <button onClick={DeleteCompTask}>Delete Completed Task</button>
        </div>
    )
}

export default ExtraFeature