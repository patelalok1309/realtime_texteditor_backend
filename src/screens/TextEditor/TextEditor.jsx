import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { toolbarOptions, WEBSOCKET_EVENTS } from "./contants.js";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { HiOutlineArrowSmUp } from "react-icons/hi";

function TextEditor() {
    const [value, setValue] = useState(""); // Editor content state
    const { id } = useParams(); // Document ID from URL parameters
    const socketRef = useRef(null); // Ref for socket instance
    const [DocumentData, setDocumentData] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const screenHeight = window.screen.height - 400;

    // Quill editor configuration
    const modules = { toolbar: toolbarOptions };

    // Debounced function to emit content changes
    const emitChange = useCallback(
        debounce((documentId, content) => {
            socketRef.current?.emit(WEBSOCKET_EVENTS.EDIT_DOCUMENT, {
                documentId,
                content,
            });
        }, 500),
        []
    );

    const fetchDocument = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/document/get-document",
                { params: { documentId: id }, withCredentials: true }
            );
            setDocumentData(response.data.document);
        } catch (error) {
            console.log("ERROR FETCHING DOCUMENT", error);
        }
    }, [id]);

    // Socket connection and event handling
    useEffect(() => {
        fetchDocument();

        // Initialize socket connection
        socketRef.current = io("http://localhost:5000");

        const socket = socketRef.current;

        // Connect to the server
        socket.on(WEBSOCKET_EVENTS.CONNECT, () => {
            console.log("Connected to socket.io server");
        });

        socket.emit(WEBSOCKET_EVENTS.JOIN_DOCUMENT, { documentId: id });

        socket.on(WEBSOCKET_EVENTS.LOAD_DOCUMENT, (content) => {
            setValue(content[0] || "");
        });

        socket.on(WEBSOCKET_EVENTS.DOCUMENT_UPDATE, (content) => {
            setValue(content);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
            emitChange.cancel(); // Cancel pending debounced calls
        };
    }, [id, fetchDocument, emitChange]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle editor changes
    const handleChange = (content) => {
        setValue(content);
        emitChange(id, content);
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-neutral-800 p-2 flex-col">
                <div className="md:w-[75%] md:h-1/2">
                    <div className="flex justify-between items-center mb-4 pb-1 w-full border-b border-gray-700">
                        <div className="flex justify-center items-center">
                            {/* <span className="text-[#ececec] font-medium text-xl">
                            </span> */}
                            <h2 className="text-2xl font-bold  ml-2 text-slate-200 px-2 py-1 bg-[#424242] rounded-md ">
                                {DocumentData?.title}
                            </h2>
                        </div>
                    </div>
                    <ReactQuill
                        value={value}
                        onChange={handleChange}
                        modules={modules}
                        theme="snow"
                        className="custom-dark-editor w-full  text-white text-lg"
                    />
                </div>
            </div>
            {scrollPosition > screenHeight && (
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="cursor-pointer fixed z-10 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light right-4 bottom-4 bg-[#212121] w-8 h-8 flex items-center justify-center "
                >
                    <HiOutlineArrowSmUp className="w-6 h-6 text-gray-400" />
                </button>
            )}
        </>
    );
}

export default TextEditor;
