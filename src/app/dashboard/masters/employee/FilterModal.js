"use client";
import {
  Modal,
  Button,
  Group,
  Select,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import api from "@/app/services/api";
import {
  GET_TECHNOLOGIES,
  GET_COUNTRIES,
} from "@/app/utility/apiEndPoint";

function FilterModal({ opened, onClose, onApply }) {
  const [filters, setFilters] = useState({
    technology: [],
    gender: "",
    dojStartDate: null,
    countryId: "",
  });

  const [technologies, setTechnologies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!opened) return; 

    const fetchData = async () => {
      try {
        const techRes = await api.post(GET_TECHNOLOGIES, {});
        setTechnologies(
          (techRes.data?.data || []).map((t) => ({
            value: String(t.id),
            label: t.technologyName,
          }))
        );

        
        const countryRes = await api.post(GET_COUNTRIES, {});
        setCountries(
          (countryRes.data?.data || []).map((c) => ({
            value: String(c.id),
            label: c.name,
          }))
        );
      } catch (err) {
        console.log("Error filter data:", err);
      }
    };

    fetchData();
  }, [opened]);

  useEffect(() => {
    if (!filters.countryId) return;
    const fetchStates = async () => {
      try {
        const stateRes = await api.post(GET_STATES, {
          countryId: filters.countryId,
        });
        setStates(
          (stateRes.data?.data || []).map((s) => ({
            value: String(s.id),
            label: s.name,
          }))
        );
      } catch (err) {
        console.log("Error fetching states:", err);
      }
    };
    fetchStates();
  }, [filters.countryId]);

  useEffect(() => {
    if (!filters.stateId) return;
    const fetchCities = async () => {
      try {
        const cityRes = await api.post(GET_CITIES, {
          stateId: filters.stateId,
        });
        setCities(
          (cityRes.data?.data || []).map((c) => ({
            value: String(c.id),
            label: c.name,
          }))
        );
      } catch (err) {
        console.log("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [filters.stateId]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Filter Employees" centered>
      <div className="space-y-4">
        <MultiSelect
          label="Technology"
          placeholder="Select technologies"
          data={technologies}
          value={filters.technology}
          onChange={(val) => handleChange("technology", val)}
        />

        <Select
          label="Gender"
          placeholder="Select gender"
          data={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "OTHER", label: "Other" },
          ]}
          value={filters.gender}
          onChange={(val) => handleChange("gender", val)}
        />

        <DateInput
          label="Joining Date"
          placeholder="Pick date of joining"
          value={filters.dojStartDate}
          onChange={(val) => handleChange("dojStartDate", val)}
        />

        <Select
          label="Country"
          placeholder="Select country"
          data={countries}
          value={filters.countryId}
          onChange={(val) => handleChange("countryId", val)}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Apply</Button>
        </Group>
      </div>
    </Modal>
  );
}

export default FilterModal;