export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: ["black" , "white" , "red" , "orange" , "yellow" , "green" , "blue" , "purple"] }, { background: [ "black" , "white" , "red" , "orange" , "yellow" , "green" , "blue" , "purple"] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
];

export const WEBSOCKET_EVENTS = {
    CONNECT : "connect",
    JOIN_DOCUMENT: "join-document",
    EDIT_DOCUMENT: "edit-document",
    DISCONNECT: "disconnect",
    LOAD_DOCUMENT: "load-document",
    DOCUMENT_UPDATE: "document-update", // server to client emit on document update
};

export const WEBSOCKET_SERVER_URL = "http://localhost:5000";