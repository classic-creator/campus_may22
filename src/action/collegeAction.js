import {
    ALL_COLLEGE_REQUEST,
    ALL_COLLEGE_SUCCESS,
    ALL_COLLEGE_FAIL,
    COLLEGE_DETAILS_REQUEST,
    COLLEGE_DETAILS_SUCCESS,
    COLLEGE_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/collegeConstants";
import axios from "axios"

export const getColleges=(keyword="")=>async(dispatch)=>{

    try {
    const token=localStorage.getItem('token')
    const config = {
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    dispatch({type:ALL_COLLEGE_REQUEST })

    const {data}=await axios.get(`/api/colleges?keyword=${keyword}`,config)
    dispatch({
        type:ALL_COLLEGE_SUCCESS,
        payload:data
    })
} catch (error) {
    dispatch({
        type:ALL_COLLEGE_FAIL,
        payload:error.response.data.message
    })
}}

//college details action

export const getCollegesDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type:COLLEGE_DETAILS_REQUEST })
    
        const {data}=await axios.get(`/api/college/${id}`)
        dispatch({
            type:COLLEGE_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:COLLEGE_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }}
//clear error

export const clearErrors=()=>async(dispatch)=>{
dispatch({
    type:CLEAR_ERRORS
})
}