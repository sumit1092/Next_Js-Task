"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterEmployees, getData } from "@/app/redux/slices/employeeSlice";
import AddEmployeeModal from "./AddEmployeeModal";
import FilterModal from "./FilterModal";
import { EmployeeTable } from "./EmployeeTable";
import CommonTable from "@/app/commonTable/commonTable";

function EmployeePage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.employees);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleApplyFilter = (filters) => {
    dispatch(filterEmployees(filters));
  };

  return (
    <>
      <CommonTable
        title="Employees List"
        columns={EmployeeTable}
        data={Array.isArray(data) ? data : []}
        loading={loading}
        onAdd={() => setAddModalOpen(true)}
        onFilter={() => setFilterModalOpen(true)}
        addButtonLabel="Add Employee"
        filterButtonLabel="Filter"
        searchPlaceholder="Search employees..."
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
    </>
  );
}

export default EmployeePage;
