"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Select,
  Grid,
  Loader,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

import {
  addEmployee,
  fetchEmployees,
  getCountry,
  getBranch,
  getDesignation,
  getRoles,
  getData,
  getStates,
  getCities,
} from "@/app/redux/slices/employeeSlice";
import { showToast } from "@/app/redux/slices/uiSlice";
import { genderData } from "@/app/utility";

const initialFormState = {
  name: "",
  email: "",
  dateOfJoining: "",
  benchDate: "",
  phoneNumber: "",
  addressLine1: "",
  employeeNumber: "",
  gender: "",
  technologyId: [],
  roleId: [],
  countryId: "",
  stateId: "",
  cityId: "",
  branch: "",
  designationId: "",
  yearOfPassing: "",
  payrollDate: "",
  months: "",
  years: "",
};

const buildPayload = (form) => ({
  name: form.name,
  email: form.email,
  dateOfJoining: form.dateOfJoining,
  benchDate: form.benchDate,
  phoneNumber: form.phoneNumber,
  addressLine1: form.addressLine1,
  employeeNumber: form.employeeNumber,
  gender: form.gender?.toUpperCase(),
  technologyId: Array.isArray(form.technologyId)
    ? form.technologyId.map(Number)
    : [Number(form.technologyId)],
  roleId: Array.isArray(form.roleId)
    ? form.roleId.map(Number)
    : [Number(form.roleId)],
  countryId: form.countryId ? Number(form.countryId) : null,
  stateId: form.stateId ? Number(form.stateId) : null,
  cityId: form.cityId ? Number(form.cityId) : null,
  branch: form.branch ? Number(form.branch) : null,
  designationId: form.designationId ? Number(form.designationId) : null,
  yearOfPassing: form.yearOfPassing ? Number(form.yearOfPassing) : null,
  payrollDate: form.payrollDate,
  months: form.months ? Number(form.months) : 0,
  years: form.years ? Number(form.years) : 0,
});

const validateForm = (form) => {
  const requiredFields = [
    "name",
    "email",
    "dateOfJoining",
    "benchDate",
    "phoneNumber",
    "addressLine1",
    "employeeNumber",
    "gender",
    "technologyId",
    "roleId",
    "countryId",
    "stateId",
    "cityId",
    "branch",
    "designationId",
    "yearOfPassing",
    "payrollDate",
    "months",
    "years",
  ];

  for (let field of requiredFields) {
    if (!form[field] || String(form[field]).trim() === "") {
      return `${field} is required`;
    }
  }
  return null;
};

function AddEmployeeModal({ isOpen, onClose }) {
  const { states, cities } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFormState);
  const [technologies, setTechnologies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [years] = useState(() =>
    Array.from({ length: 50 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return { value: String(year), label: String(year) };
    })
  );

  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        const [countryRes, branchRes, designationRes, rolesRes, techRes] =
          await Promise.all([
            dispatch(getCountry()).unwrap(),
            dispatch(getBranch()).unwrap(),
            dispatch(getDesignation()).unwrap(),
            dispatch(getRoles()).unwrap(),
            dispatch(fetchEmployees()).unwrap(),
            dispatch(getData()).unwrap(),
          ]);

        setTechnologies(
          techRes?.data.map((t) => ({
            value: String(t.id),
            label: t.technologyName,
          }))
        );

        setCountries(
          countryRes?.data?.map((item) => ({
            value: String(item.id),
            label: item.countryName,
          }))
        );
        setBranches(
          branchRes?.data?.map((item) => ({
            value: String(item.id),
            label: item.location,
          }))
        );
        setDesignations(
          designationRes?.data?.map((item) => ({
            value: String(item.id),
            label: item.designation,
          }))
        );
        setRoles(
          rolesRes?.data?.map((item) => ({
            value: String(item.id),
            label: item.roleName,
          }))
        );
      } catch (err) {
        console.log("Error fetching dropdowns", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchDropdownData();
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (form.countryId) {
      dispatch(getStates(form.countryId));
      setForm((prev) => ({ ...prev, stateId: null, cityId: null }));
    }
  }, [form.countryId, dispatch]);

  useEffect(() => {
    if (form.stateId) {
      dispatch(getCities(form.stateId));
      setForm((prev) => ({ ...prev, cityId: null }));
    }
  }, [form.stateId, dispatch]);
  const handleSubmit = async () => {
    const error = validateForm(form);
    if (error) {
      return dispatch(showToast({ message: error, type: "error" }));
    }
    try {
      const payload = buildPayload(form);
      await dispatch(addEmployee(payload)).unwrap();
      await dispatch(getData());
      dispatch(
        showToast({ message: "Employee added successfully!", type: "success" })
      );
      setForm(initialFormState);
      onClose();
    } catch (err) {
      dispatch(showToast({ message: "Error adding employee", type: "error" }));
      console.log("Employee add error:", err.message);
    } finally {
      onClose();
      setForm(initialFormState);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Add Employee"
      size="80%"
      centered
      style={{
        content: {
          heigth: "90vh",
          overflowY: "auto",
        },
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid gutter="md" mt={30}>
          <Grid.Col span={4}>
            <TextInput
              required
              label="Employee Name"
              placeholder="Enter Employee Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Technology"
              placeholder="Select Technology"
              data={technologies}
              value={form.technologyId}
              onChange={(val) => setForm({ ...form, technologyId: val })}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <DateInput
              required
              label="Date of Joining"
              placeholder="Select Date of Joining"
              value={form.dateOfJoining}
              onChange={(val) => setForm({ ...form, dateOfJoining: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              required
              label="Phone"
              placeholder="Enter Phone Number"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              required
              label="Address"
              placeholder="Enter Address"
              value={form.addressLine1}
              onChange={(e) =>
                setForm({ ...form, addressLine1: e.target.value })
              }
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Role"
              placeholder="Select Role"
              data={roles}
              value={form.roleId}
              onChange={(val) => setForm({ ...form, roleId: val })}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Gender"
              placeholder="Select Gender"
              data={genderData}
              value={form.gender}
              onChange={(val) => setForm({ ...form, gender: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <DateInput
              required
              label="Bench Date"
              placeholder="Select Bench Date"
              value={form.benchDate}
              onChange={(val) => setForm({ ...form, benchDate: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              required
              label="Email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              required
              label="Employee Number"
              placeholder="Enter Employee Number"
              value={form.employeeNumber}
              onChange={(e) =>
                setForm({ ...form, employeeNumber: e.target.value })
              }
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Country"
              placeholder="Select Country"
              data={countries}
              value={form.countryId}
              onChange={(val) => setForm({ ...form, countryId: val })}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="State"
              placeholder="Select State"
              data={states}
              value={form.stateId ? String(form.stateId) : null}
              onChange={(val) => setForm({ ...form, stateId: val })}
              disabled={!form.countryId}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="City"
              placeholder="Select City"
              data={cities}
              value={form.cityId ? String(form.cityId) : null}
              onChange={(val) => setForm({ ...form, cityId: val })}
              disabled={!form.stateId}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Branch"
              placeholder="Select Branch"
              data={branches}
              value={form.branch}
              onChange={(val) => setForm({ ...form, branch: val })}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Designation"
              placeholder="Select Designation"
              data={designations}
              value={form.designationId}
              onChange={(val) => setForm({ ...form, designationId: val })}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Year of Passing"
              placeholder="Select Year of Passing"
              data={years}
              value={form.yearOfPassing ?? undefined}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  yearOfPassing: val ?? undefined,
                }))
              }
              searchable
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <DateInput
              required
              label="Payroll Date"
              placeholder="Select Payroll Date"
              value={form.payrollDate}
              onChange={(val) => setForm({ ...form, payrollDate: val })}
            />
          </Grid.Col>

          <Grid.Col span={2}>
            <TextInput
              required
              label="Years"
              placeholder="Enter Years"
              value={form.years}
              onChange={(e) => setForm({ ...form, years: e.target.value })}
            />
          </Grid.Col>

          <Grid.Col span={2}>
            <TextInput
              required
              label="Months"
              placeholder="Enter Months"
              value={form.months}
              onChange={(e) => setForm({ ...form, months: e.target.value })}
            />
          </Grid.Col>
        </Grid>
      )}

      <Group justify="flex-end" mt={50}>
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit loading={loading}">
          Add
        </Button>
      </Group>
    </Modal>
  );
}

export default AddEmployeeModal;
