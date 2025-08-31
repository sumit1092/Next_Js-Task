"use client";

import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Group, TextInput, Button, Center, Loader } from "@mantine/core";
import { Search } from "lucide-react";

function CommonTable({
  title,
  columns,
  data,
  loading,
  onAdd,
  onFilter,
  addButtonLabel = "Add",
  filterButtonLabel = "Filter",
  enableSearch = true,
  searchPlaceholder = "Search...",
}) {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!filterText) return data;
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  return (
    <div className="p-6">
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}

      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={loading}
        persistTableHead
        highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="600px"
        striped
        pagination
        progressComponent={
          <Center py="lg">
            <Loader size="md" />
          </Center>
        }
        customStyles={{
          table: {
            style: {
              minHeight: "550px",
              maxHeight: "600px",
            },
          },
          headCells: {
            style: {
              fontWeight: "bold",
              fontSize: "14px",
              backgroundColor: "#f1f3f5",
              position: "sticky",
              top: 0,
              zIndex: 10,
            },
          },
          cells: {
            style: {
              fontSize: "13px",
              paddingTop: "10px",
              paddingBottom: "10px",
            },
          },
        }}
        actions={
          <Group align="center" justify="space-between" style={{ width: "100%" }}>
            {enableSearch && (
              <TextInput
                placeholder={searchPlaceholder}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                icon={<Search size={16} />}
                style={{ width: "250px" }}
              />
            )}

            <Group>
              {onFilter && (
                <Button onClick={onFilter}>{filterButtonLabel}</Button>
              )}
              {onAdd && (
                <Button variant="outline" onClick={onAdd}>
                  {addButtonLabel}
                </Button>
              )}
            </Group>
          </Group>
        }
      />
    </div>
  );
}

export default CommonTable;
