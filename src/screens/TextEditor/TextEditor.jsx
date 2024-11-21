import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { toolbarOptions, WEBSOCKET_EVENTS } from "./contants.js";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { GrEdit } from "react-icons/gr";

function TextEditor() {
    const [value, setValue] = useState(""); // Editor content state
    const { id } = useParams(); // Document ID from URL parameters
    const socketRef = useRef(null); // Ref for socket instance
    const [Document, setDocument] = useState(null);
    const [nameField, setNameField] = useState("");
    const [name, setName] = useState("");

    // Quill editor configuration
    const modules = { toolbar: toolbarOptions };

    // Debounced function to emit content changes
    const emitChange = useCallback(
        debounce((documentId, content) => {
            if (socketRef.current) {
                socketRef.current.emit(WEBSOCKET_EVENTS.EDIT_DOCUMENT, {
                    documentId,
                    content,
                });
            }
        }, 500),
        []
    );

    const fetchDocument = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/document/get-document",
                { params: { documentId: id } }
            );
            setDocument(response.data.document);
        } catch (error) {
            console.log("ERROR FETCHING DOCUMENT", error);
        }
    };

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
    }, [id, emitChange]);

    // Handle editor changes
    const handleChange = (content) => {
        setValue(content);
        emitChange(id, content);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-800 p-2 flex-col">
            <div className="md:w-1/2 md:h-1/2">
                <div className="flex justify-between items-center mb-4 pb-1 w-full border-b border-gray-700">
                    <div className="flex justify-center items-center">
                        <span className="text-[#ececec] font-medium text-xl">
                            Document Name :{" "}
                        </span>
                        <h2 className="text-2xl font-bold  ml-2 text-slate-200 px-2 py-1 bg-[#424242] rounded-md ">
                            {Document?.title}
                        </h2>
                    </div>
                    {name && (
                        <div className="flex justify-center items-center">
                            <h2 className="text-2xl font-bold text-white  text-right">
                                {name}
                            </h2>
                            <span className="ml-2">
                                <GrEdit className="w-5 h-5 ml-2 text-white hover:text-gray-500" />
                            </span>
                        </div>
                    )}
                    {(!name || name.length === 0) && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={nameField}
                                onChange={(e) => setNameField(e.target.value)}
                                className="mb-2 p-2  border border-gray-500 border-r-0 outline-none bg-transparent text-white rounded-l-lg"
                            />
                            <button
                                onClick={() => setName(nameField)}
                                className="mb-2 p-2  border border-gray-500 bg-blue-500 hover:bg-blue-800 outline-none  text-white rounded-r-lg"
                            >
                                save
                            </button>
                        </div>
                    )}
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
    );
}

export default TextEditor;
