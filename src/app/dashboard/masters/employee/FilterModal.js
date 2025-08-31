"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Group,
  Select,
  Grid,
  Loader,
  MultiSelect,
} from "@mantine/core";

import { genderData, statusData, employeeStatus, joiningDate } from "@/app/utility";
import { fetchEmployees } from "@/app/redux/slices/employeeSlice";

const initialFilterState = {
  gender: [],
  status: [],
  technologyId: [],
  dateOfJoining: [],
  employeeStatus: [], 
};

function FilterModal({ opened, onClose, onApply }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFilterState);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dropdowns
  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        const [techRes] = await Promise.all([
          dispatch(fetchEmployees()).unwrap(),
        ])

        setTechnologies(
          techRes?.data?.map((t) => ({
            value: String(t.id),
            label: t.technologyName,
          }))
        );
      } catch (err) {
        console.log("Error fetching dropdowns", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (opened) {
      fetchDropdownData();
    }
  }, [opened]);
const buildFilterPayload = (form) => {
  const payload = {};

  if(form.gender.length > 0){
    payload.gender = form.gender.toUpperCase();
  }

  const statusMap = {
    "Training Completed": 0,
    "Ready to Deploy": 1,
    "Deployed": 2,
    "Under Training": 3,
    "Freeze": 5,
  };
  if (form.status.length > 0) {
  payload.status = form.status
    .map((s) => statusMap[s]) 
    .join(","); 
}

  if (form.technologyId.length > 0) {
    payload.technologyId = form.technologyId.map((t) => Number(t)).join(",");
  }

  if (form.employeeStatus.length > 0) {
    if (form.employeeStatus.includes("Active")) {
      payload.active = true;
    } else if (form.employeeStatus.includes("Deleted")) {
      payload.active = false;
    }
  }

  if (form.dateOfJoining.length > 0) {
    const today = new Date();
    let startDate, endDate;

    switch (form.dateOfJoining[0]) {
      case "1 Week":
        endDate = today.toISOString().split("T")[0];
        startDate = new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
        break;
      case "1 Month":
        endDate = new Date().toISOString().split("T")[0];
        startDate = new Date(today.setMonth(today.getMonth() - 1))
          .toISOString()
          .split("T")[0];
        break;
      case "1 Quarter":
        endDate = new Date().toISOString().split("T")[0];
        startDate = new Date(today.setMonth(today.getMonth() - 3))
          .toISOString()
          .split("T")[0];
        break;
      case "1 Year":
        endDate = new Date().toISOString().split("T")[0];
        startDate = new Date(today.setFullYear(today.getFullYear() - 1))
          .toISOString()
          .split("T")[0];
        break;
      default:
        break;
    }

    if (startDate && endDate) {
      payload.dojStartDate = startDate;
      payload.dojEndDate = endDate;
    }
  }

  return payload;
};


const handleApply = () => {
  const payload = buildFilterPayload(form);
  onApply(payload);   
  onClose();
  setForm(initialFilterState);
};


  const handleClear = () => {
    setForm(initialFilterState);
    onApply(initialFilterState); 
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Filter Employees"
      size="50%"
      centered
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid gutter="md" mt={30}>
          <Grid.Col span={6}>
            <Select
              label="Gender"
              placeholder="Select Gender"
              data={genderData}
              value={form.gender}
              onChange={(val) => setForm({ ...form, gender: val })}
              searchable
              clearable
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <MultiSelect
              label="Status"
              placeholder="Select Status"
              data={statusData}
              value={form.status}
              onChange={(val) => setForm({ ...form, status: val })}
              searchable
              clearable
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <MultiSelect
              label="Technology"
              placeholder="Select Technology"
              data={technologies}
              value={form.technologyId}
              onChange={(val) => setForm({ ...form, technologyId: val })}
              searchable
              clearable
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <MultiSelect
              label="Date of Joining"
              placeholder="Select Date"
              value={form.dateOfJoining}
              data={joiningDate}
              onChange={(val) => setForm({ ...form, dateOfJoining: val })}
              clearable
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <MultiSelect
              label="Payroll Status"
              placeholder="Select Payroll Status"
              data={employeeStatus}
              value={form.employeeStatus}
              onChange={(val) => setForm({ ...form, employeeStatus: val })}
              searchable
              clearable
            />
          </Grid.Col>
        </Grid>
      )}

      <Group justify="flex-end" mt={50}>
        <Button variant="default" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
    </Modal>
  );
}

export default FilterModal;
