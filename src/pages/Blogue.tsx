import { useNavigate } from 'react-router-dom';
import BlogueForm from "../components/BlogueForm";
import {useState} from "react";

function Blogue() {
    const navigate = useNavigate()
    return (

        <div>
            <div >
                <h1>Page Blogue </h1>
                <BlogueForm/>
            </div>

        </div>



    );
}

export default Blogue;
