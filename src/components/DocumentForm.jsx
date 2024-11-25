import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth"

function DocumentForm() {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (title.trim() === "" || title === undefined || title === null) {
                return alert("Title is required");
            }

            setIsLoading(true);
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/v1/document/create",
                    { title },
                    {withCredentials: true}
                );

                setIsLoading(false);
                navigate(`/document/${res.data.document._id}`);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
        [title, navigate]
    );

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <input
                type="text"
                disabled={isLoading}
                placeholder="Enter title here..."
                className={`w-full max-w-md px-4 py-2 text-[#F8F8F2] bg-[#1E1E2E] border border-[#44475A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#212121] transition duration-200 ${isLoading && "opacity-50 cursor-not-allowed"}`}
                required
                onChange={(e) => setTitle(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e)}
            />
            <button
                disabled={isLoading}
                onClick={(e) => handleSubmit(e)}
                className={`mt-4 px-6 py-2 text-lg text-[#F8F8F2] bg-[#6272A4] hover:bg-[#44475A] rounded-md transition duration-300 ${
                    isLoading && "opacity-50"
                }`}
            >
                Submit
            </button>
        </div>
    );
}

export default DocumentForm;
