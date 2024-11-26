import axios from "axios";
import DataTable from "../../components/DataTable";
import DocumentForm from "../../components/DocumentForm";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/document/getAll", {
                withCredentials: true,
            })
            .then((res) => {
                setData(res.data.documents);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <ToastContainer />
            <main className="flex min-h-screen items-center justify-center  bg-[#212121] ">
                <div className="p-10 bg-[#0d0d0d] rounded-lg shadow-xl shadow-[#44475A]/50 text-center">
                    <h1 className="text-[#F8F8F2] text-4xl md:text-6xl font-serif tracking-wide hover:text-[#44475A] hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text shadow-lg">
                        Text editor
                    </h1>

                    <p className="mt-4 text-[#cbced6] text-lg">
                        A sleek, modern, and functional dark-themed editor.
                    </p>
                    <p className="mt-1 block text-[#A6ACB9] text-sm">
                        Collaborate with your friends and family in realtime.
                    </p>

                    <DocumentForm />
                    <hr className="mt-8 border-t border-[#44475A]" />
                    <DataTable data={data} />
                </div>
            </main>
        </>
    );
}

export default Home;
