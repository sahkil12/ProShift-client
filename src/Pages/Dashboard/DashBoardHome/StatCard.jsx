
const StatCard = ({ title, value, icon }) => (
     <div className="hover:-translate-y-0.5 hover:shadow-lg duration-200 p-5 rounded shadow-md border border-neutral-300 bg-white text-gray-900 flex items-center gap-6">
          {icon}
          <div className="space-y-1">
               <div className="text-xl font-bold text-gray-700">{title}</div>
               <div className="text-3xl font-bold text-orange-500">{value}</div>
          </div>
     </div>
);
export default StatCard;