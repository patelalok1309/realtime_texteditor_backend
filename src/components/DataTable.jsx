import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DataTable({ data }) {
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const navigate = useNavigate()

    const handleRename = async (id) => {
        await axios
            .patch(
                "http://localhost:5000/api/v1/document/rename",
                (data = {
                    documentId: id,
                    title: newTitle,
                })
            )
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:5000/api/v1/document/delete", {
                data: { documentId: id },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleNavigate = (id) => {
        navigate(`/document/${id}`);
    }


    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div className="text-[#F8F8F2] mt-8">No Documents</div>;
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <table className="w-full max-w-3xl table-auto bg-[#1E1E2E] border border-[#44475A] rounded-lg shadow-md">
                <thead className="rounded-lg">
                    <tr className="bg-[#25252F] text-[#F8F8F2] text-left rounded-lg">
                        <th className="px-4 py-2 border-b border-[#44475A] rounded-lg">
                            Sr. No
                        </th>
                        <th className="px-4 py-2 border-b border-[#44475A]">
                            Title
                        </th>
                        <th className="px-4 py-2 border-b border-[#44475A]">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={row._id}
                            className="text-[#A6ACB9] hover:bg-[#2A2A3A] transition"
                        >
                            <td className="px-4 py-2 border-b border-[#44475A]">
                                {index + 1}
                            </td>
                            <td className="px-4 py-2 border-b border-[#44475A]">
                                {editingId === row._id ? (
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) =>
                                            setNewTitle(e.target.value)
                                        }
                                        onBlur={() => handleRename(row._id)}
                                    />
                                ) : (
                                    row.title
                                )}
                            </td>
                            <td className="px-4 py-2 border-b border-[#44475A] space-x-2">
                                <button
                                onClick={() => handleNavigate(row._id)}
                                    className="px-4 py-1 text-sm bg-[#5e5f0f] text-[#F8F8F2] rounded-md hover:bg-[#b4b62e] transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setEditingId(row._id)}
                                    className="px-4 py-1 text-sm bg-[#6272A4] text-[#F8F8F2] rounded-md hover:bg-[#44475A] transition"
                                >
                                    Rename
                                </button>
                                <button
                                    onClick={() => handleDelete(row._id)}
                                    className="px-4 py-1 text-sm bg-red-500 text-[#F8F8F2] rounded-md hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
