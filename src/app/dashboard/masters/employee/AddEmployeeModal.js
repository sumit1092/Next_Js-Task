"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Select,
  TextInput,
  Button,
  Grid,
  Group,
  Loader,
} from "@mantine/core";
import { addEmployee, fetchEmployees } from "@/app/redux/slices/employeeSlice";
import api from "@/app/services/api";
import { GET_EMPLOYEE } from "@/app/utility/apiEndPoint";
import { showToast } from "@/app/redux/slices/uiSlice";

const initialFormState = {
  name: "",
  email: "",
  employeeNumber: "",
  gender: "",
  technologyId: "",
  roleId: "",
  countryId: "",
  stateId: "",
  cityId: "",
  branch: "",
  designationId: "",
};

function AddEmployeeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialFormState);

  const [technologies, setTechnologies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        const res = await api.get(GET_EMPLOYEE);
        const data = res.data?.data || [];

        setTechnologies(
          data.map((t) => ({
            value: String(t.id),
            label: t.technologyName,
          }))
        );

        const uniqueCategories = Array.from(
          new Map(
            data
              .filter((t) => t.category?.id && t.category?.categoryName) 
              .map((t) => [t.category.id, t.category.categoryName])
          ).entries()
        ).map(([id, name]) => ({
          value: String(id),
          label: name,
        }));

        setRoles(uniqueCategories);

      } catch (err) {
        console.error("Error fetching dropdown data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchDropdownData();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      await dispatch(addEmployee(form));
      await dispatch(fetchEmployees());
      
      dispatch(
        showToast({ message: "Employee added successfully!", type: "success" })
      );
      if(fetchEmployees().rejected) {
        dispatch(
          showToast({ message: "Error adding employee", type: "error" })
        );
      }
      setForm(initialFormState);
      onClose();
    } catch (err) {
      console.error(
        "Employee add error:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Add Employee"
      size="80%"
      centered
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid gutter="md">
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
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Gender"
              placeholder="Select Gender"
              data={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              value={form.gender}
              onChange={(val) => setForm({ ...form, gender: val })}
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
              data={[
                { value: "IN", label: "India" },
                { value: "US", label: "United States" },
                { value: "CA", label: "Canada" },
                { value: "AU", label: "Australia" },
                { value: "UK", label: "United Kingdom" },
                { value: "FR", label: "France" },
                { value: "DE", label: "Germany" },
              ]}
              value={form.countryId}
              onChange={(val) => setForm({ ...form, countryId: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="State"
              placeholder="Select State"
              data={[
                { value: "MH", label: "Maharashtra" },
                { value: "UP", label: "Uttar Pradesh" },
                { value: "MP", label: "Madhya Pradesh" },
                { value: "GJ", label: "Gujarat" },
                { value: "RJ", label: "Rajasthan" },
                { value: "DL", label: "Delhi" },
                { value: "TN", label: "Tamil Nadu" },
              ]}
              value={form.stateId}
              onChange={(val) => setForm({ ...form, stateId: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="City"
              placeholder="Select City"
              data={[
                { value: "Mumbai", label: "Mumbai" },
                { value: "Pune", label: "Pune" },
                { value: "Nagpur", label: "Nagpur" },
                { value: "Ahmedabad", label: "Ahmedabad" },
                { value: "Surat", label: "Surat" },
                { value: "Jaipur", label: "Jaipur" },
                { value: "Delhi", label: "Delhi" },
                { value: "Chennai", label: "Chennai" },
              ]}
              value={form.cityId}
              onChange={(val) => setForm({ ...form, cityId: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Branch"
              placeholder="Select Branch"
              data={[
                { value: "Pune", label: "Pune" },
                { value: "Nagpur", label: "Nagpur" },
                { value: "Ahmedabad", label: "Ahmedabad" },
                { value: "Surat", label: "Surat" },
                { value: "Jaipur", label: "Jaipur" },
                { value: "Delhi", label: "Delhi" },
                { value: "Chennai", label: "Chennai" },
              ]}
              value={form.branch}
              onChange={(val) => setForm({ ...form, branch: val })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              required
              label="Designation"
              placeholder="Select Designation"
              data={[
                { value: "Manager", label: "Manager"},
                { value: "Developer", label: "Developer"},
                { value: "Tester", label: "Tester"},
                { value: "HR", label: "HR"},
                { value: "Sales", label: "Sales"},
                { value: "Marketing", label: "Marketing"},
                { value: "Finance", label: "Finance"},
              ]}
              value={form.designationId}
              onChange={(val) => setForm({ ...form, designationId: val.id })}
            />
          </Grid.Col>
        </Grid>
      )}

      <Group position="right" mt="lg">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit">Add</Button>
      </Group>
    </Modal>
  );
}

export default AddEmployeeModal;