import axios from "axios";
import DataTable from "./components/DataTable";
import DocumentForm from "./components/DocumentForm";
import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/document/getAll")
            .then((res) => {
                setData(res.data.documents);
            })
            .catch((err) => console.log(err))
            .finally(() => console.log(data));
    }, []);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1E1E2E] to-[#2A2A3A]">
            <div className="p-10 bg-[#25252F] rounded-lg shadow-lg shadow-[#44475A]/50 text-center">
                <h1 className="text-[#F8F8F2] text-6xl font-serif tracking-wide hover:text-[#44475A] transition duration-300 ease-in-out">
                    Text Editor
                </h1>
                <p className="mt-4 text-[#A6ACB9] text-lg">
                    A sleek, modern, and functional dark-themed editor.
                </p>
                <DocumentForm />
                <hr className="mt-8 border-t border-[#44475A]" />
                <DataTable data={data} />
            </div>
        </main>
    );
}

export default App;
