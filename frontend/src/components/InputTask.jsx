import { useContext, useState } from 'react'
import { TodoDispatchContext } from "../context/Context";
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import api from "../utils/baseUrl";

const InputTask = () => {

    const [title, setTitle] = useState('')

    const [content, setContent] = useState('')

    const dispatch = useContext(TodoDispatchContext)

    const baseUrl = import.meta.env.VITE_BASE_URL


    return (
        <div className="InputTask">

            <div className="inputs">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    placeholder="Add your title..."
                />
                <input
                    type="text"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                    placeholder="Add your content..."
                />
            </div>


            <button className="my-button" onClick={() => {

                setTitle('')

                setContent('')

                const id = uuid()

                const data = {
                    id,
                    title,
                    content
                }

                api.post(`/api/addtodo`, data).then((resp) => {
                    console.log(resp)
                }).catch((error) => {
                    console.log(error)
                })

                dispatch({

                    type: "ADD_TODO",
                    title: title,
                    content: content,
                    isDone: false,
                    id
                })
            }}>ADD</button>
        </div>
    )
}

export default InputTask

let id = 2;