import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);

  return (
    <>
      <main className="min-h-screen bg-dark-layer-2">
        <Topbar />
        <h1
          className="mb-5 mt-10 text-center text-2xl font-medium
					uppercase text-gray-400"
        >
          &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
        </h1>
        <div className="relative mx-auto overflow-x-auto px-6 pb-10">
          {loadingProblems && (
            <div className="mx-auto w-full animate-pulse sm:w-9/12">
              {[...Array(10)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          )}
          <table className="mx-auto w-full max-w-[1200px] text-left text-sm text-gray-200 sm:w-7/12">
            {!loadingProblems && (
              <thead className="border-b text-xs uppercase text-gray-400 ">
                <tr>
                  <th scope="col" className="w-0 px-1 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="w-0 px-6 py-3 font-medium">
                    Title
                  </th>
                  <th scope="col" className="w-0 px-6 py-3 font-medium">
                    Difficulty
                  </th>

                  <th scope="col" className="w-0 px-6 py-3 font-medium">
                    Category
                  </th>
                  <th scope="col" className="w-0 px-6 py-3 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
        </div>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="mt-4 flex items-center justify-center space-x-12 px-6">
      <div className="h-6 w-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 w-32 rounded-full bg-dark-layer-1 sm:w-52"></div>
      <div className="h-4 w-32 rounded-full bg-dark-layer-1 sm:w-52"></div>
      <div className="h-4 w-32 rounded-full bg-dark-layer-1 sm:w-52"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
