import { NavLink } from "react-router";

const DashboardNavItem = ({ to, icon: Icon, children, end = false, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        onClick={onClick}
        className={({ isActive }) =>
          `rounded-lg ${isActive ? "bg-emerald-300" : ""}`
        }
      >
        <span className="flex items-center gap-4 text-gray-800 font-semibold">
          <Icon />
          {children}
        </span>
      </NavLink>
    </li>
  );
};

export default DashboardNavItem;