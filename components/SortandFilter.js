"use client";
import { useMemo, useState } from "react";

const employees = [
  { id: 1, name: "Rahim", department: "Engineering", salary: 50000 },
  { id: 2, name: "Karim", department: "HR", salary: 35000 },
  { id: 3, name: "Nadia", department: "Engineering", salary: 65000 },
  { id: 4, name: "Sara", department: "Marketing", salary: 40000 },
];

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) => {
        const matchesSearch = employee.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesDepartment =
          department === "All" || employee.department === department;

        return matchesSearch && matchesDepartment;
      })
      .sort((a, b) => {
        const first = a[sortKey];
        const second = b[sortKey];

        const comparison =
          typeof first === "string"
            ? first.localeCompare(second)
            : first - second;

        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [search, department, sortKey, sortDirection]);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="max-w-4xl mx-auto ">
      <input
        placeholder="Search employees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="All">All departments</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Marketing">Marketing</option>
      </select>

      <table>
        <thead>
          <tr className="ml-5">
            <th className="px-4 py-2 text-left">
              <button onClick={() => handleSort("name")}>
                Name{" "}
                {sortKey === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">
              <button onClick={() => handleSort("salary")}>
                Salary{" "}
                {sortKey === "salary" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">{employee.salary}</td>
            </tr>
          ))}

          {filteredEmployees.length === 0 && (
            <td colSpan={3} className="px-4 py-4 text-center">
              No employees found.
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
}
