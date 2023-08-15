import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
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
          <table className="mx-auto w-full max-w-[1200px] text-left text-sm text-gray-200 sm:w-7/12">
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
            <ProblemsTable />
          </table>
        </div>
      </main>
    </>
  );
}
