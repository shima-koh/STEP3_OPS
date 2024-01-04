"use client";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

const LHeader = () => {
    const router = useRouter();

    return (
        <div className="w-full grid justify-items-start">
            <button type="bookmark" className="btn btn-ghost btn-circle" aria-label="戻る" onClick={() => router.back()}>
                <FaChevronLeft />
            </button>
        </div>
    );
};

export default LHeader;