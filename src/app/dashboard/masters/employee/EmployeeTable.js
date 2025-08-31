import { Tooltip } from "@mantine/core"

export const EmployeeTable = [
    { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email },
        {
          name: "Employee Number",
          selector: (row) => row.employeeNumber,
          sortable: true,
        },
        { name: "Gender", selector: (row) => row.gender },
        { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
        {
          name: "Technology",
          selector: (row) => row.technologyName,
          sortable: true,
        },
        { name: "Designation", selector: (row) => row.designation },
        { name: "Country", selector: (row) => row.countryName, sortable: true },
        { name: "State", selector: (row) => row.stateName, sortable: true },
        { name: "City", selector: (row) => row.cityName, sortable: true },
        { name: "Role", selector: (row) => row.roleName },
        {
          name: "Date of Joining",
          selector: (row) => row.dateOfJoining,
          sortable: true,
        },
        { name: "Bench Date", selector: (row) => row.benchDate, sortable: true },
        {
          name: "Deployment Date",
          selector: (row) => row.deploymentDate,
          sortable: true,
        },
        {
          name: "Payroll Date",
          selector: (row) => row.payrollDate,
          sortable: true,
        },
        {
          name: "Status",
          selector: (row) => (
            <Tooltip label={row.status}>
              <span>{row.status}</span>
            </Tooltip>
          ),
        },
]