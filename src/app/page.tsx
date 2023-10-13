'use client';
import SearchCategory from "@/components/SearchCategory";
import Linkedin from "@/components/Linkedin";

export default function Home() {

    return (
        <main className="flex bg-white min-h-screen flex-col items-center justify-between p-2">
            <SearchCategory/>
            <Linkedin/>
        </main>
    )
}
