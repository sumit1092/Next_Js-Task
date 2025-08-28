"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { Button, Group } from "@mantine/core";
import { fetchEmployees, filterEmployees } from "@/app/redux/slices/employeeSlice";
import AddEmployeeModal from "./AddEmployeeModal";
import FilterModal from "./FilterModal";

function EmployeePage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employees);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleApplyFilter = (filters) => {
    dispatch(filterEmployees(filters));
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Date of Joining", selector: (row) => row.doj },
    { name: "Designation", selector: (row) => row.designation },
    { name: "Technology", selector: (row) => row.technology },
    { name: "Gender", selector: (row) => row.gender },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees List</h1>

      <DataTable
        columns={columns}
        data={Array.isArray(list) ? list : []} 
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        actions={
          <Group>
            <Button onClick={() => setFilterModalOpen(true)}>Filter</Button>
            <Button variant="outline" onClick={() => setAddModalOpen(true)}>
              Add Employee
            </Button>
          </Group>
        }
      />

      <AddEmployeeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      <FilterModal
        opened={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleApplyFilter}
      />
    </div>
  );
}

export default EmployeePage;
