import React, { useState, useContext } from 'react'
import { TodoDispatchContext } from "../context/Context";
import axios from "axios"
import './style.scss'

const EditTask = ({ item }) => {

    const [isEditing, setIsEditing] = useState(false);

    const [title, settitle] = useState(item.title);

    const [content, setcontent] = useState(item.content)

    const dispatch = useContext(TodoDispatchContext)


    const delHandler = (id) => {

        axios.delete(`/api/deltodo/${id}?deleteType=1`).then((resp) => {
            console.log("Success", resp)
        }).catch((error) => {
            console.log(error)
        })

        dispatch({
            type: "DEL_TODO",
            id: id
        })
    }

    const startEditing = () => {
        setIsEditing(true)
    }

    const saveEdit = (id) => {

        setIsEditing(false)

        dispatch({

            type: "UPDATE_TODO",
            id: id,
            title: title,
            content: content

        })
    }

    const cancelEdit = () => {
        setIsEditing(false)
    }

    const taskDone = (id) => {

        const data = {}

        data['id'] = item.id

        data['isDone'] = !item.isDone

        axios.put('/api/updatetodo/1', data).then((resp) => {
            console.log('success', resp)
        }).catch((error) => {
            console.log(error)
        })

        dispatch({
            type: "UPDATE_TODO",
            id: id,
            isDone: !item.isDone
        })

    }


    return (

        <div className="list-items-item">
            {
                isEditing

                    ? (
                        <div className="list-items-item-Edit">

                            <input
                                type='text'
                                value={title}
                                onChange={(e) => { settitle(e.target.value) }}
                            />

                            <input
                                type='text'
                                value={content}
                                onChange={(e) => { setcontent(e.target.value) }}
                            />

                            <div className="save-cancel">
                                <button onClick={() => {

                                    saveEdit(item.id)

                                    const data = {}

                                    data['id'] = item.id

                                    if (item.title !== title) {
                                        data['title'] = title
                                    }
                                    if (item.content !== content) {
                                        data['content'] = content;
                                    }

                                    console.log(data)

                                    axios.put('/api/updatetodo/1', data).then((resp) => {
                                        console.log('success', resp)
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                                }
                                }>Save</button>

                                <button onClick={() => { cancelEdit(item.id) }}>Cancel</button>
                            </div>

                        </div>)
                    : (
                        <>
                            <input
                                type='checkbox'
                                checked={item.isDone}
                                onChange={() => { taskDone(item.id) }}
                            />
                            <div>
                                <div style={{ textAlign: 'center' }} className={item.isDone ? "strikethrough" : ""}>{item.title}</div>
                                <div className={item.isDone ? "strikethrough" : ""}>{item.content}</div>
                            </div>
                            <div className="">
                                <button onClick={startEditing}>Edit</button>
                                <button onClick={() => delHandler(item.id)}>Del</button>
                            </div>
                        </>
                    )
            }
        </div>

    )
}

export default EditTask