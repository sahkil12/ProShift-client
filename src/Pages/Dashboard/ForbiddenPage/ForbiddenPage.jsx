import { Link } from "react-router";

const ForbiddenPage = () => {
     return (
          <div className="flex items-center justify-center h-screen bg-white my-10  rounded-2xl border border-gray-200 w-full">
               <div className=" p-12 rounded-2xl w-full h-full text-center flex flex-col justify-center">
                    <h1 className="text-9xl font-extrabold text-cyan-900 mb-4">403</h1>
                    <h2 className="text-3xl font-bold mb-6 text-cyan-900">Forbidden</h2>
                    <p className="text-gray-600 mb-8 font-semibold text-lg">
                         You don’t have permission to access this page.
                    </p>
                    <Link
                         to="/dashboard"
                         className=" font-semibold btn btn-primary px-12 text-base text-black w-fit mx-auto transition"
                    >
                         Go Back to Dashboard
                    </Link>
               </div>
          </div>
     );
};

export default ForbiddenPage;