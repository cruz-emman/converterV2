"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const subjects = [
  "sub1",
  "sub2",
  "sub3",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9",
  "sub10",
  "sub11",
  "sub12",
  "sub13",
  "sub14",
  "sub15",
  "sub16",
  "sub17",
  "sub18",
  "sub19",
  "sub20",
];

const sections = [
  "sec1",
  "sec2",
  "sec3",
  "sec4",
  "sec5",
  "sec6",
  "sec7",
  "sec8",
  "sec9",
  "sec10",
  "sec11",
  "sec12",
  "sec13",
  "sec14",
  "sec15",
  "sec16",
  "sec17",
  "sec18",
  "sec19",
  "sec20",
];

const SampleColumnComponent = ({ sem, year }) => [
  { field: "username", header: "username", width: 250 },
  ...subjects.flatMap((subject, index) => [
    {
      field: `course${index + 1}`,
      header: `Subject ${index + 1}`,
      renderCell: (params) => {
        let firstSubject = "";
        let section = params.row[subject] || "";
        if (params.row[sections[index]]) {
          let dashIndex = params.row[sections[index]].indexOf("-");
          firstSubject =
            dashIndex !== -1
              ? params.row[sections[index]].substring(dashIndex + 1)
              : params[section[index]];
        }
        let combined = section.concat(" ", firstSubject);
        return (
          <div>
            {params.row[sections[index]] ? `${combined} ${sem}_${year}` : ""}
          </div>
        );
      },
      valueGetter: (params) => {
        let firstSubject = "";
        let section = params.row[subject] || "";
        if (params.row[sections[index]]) {
          let dashIndex = params.row[sections[index]].indexOf("-");
          firstSubject =
            dashIndex !== -1
              ? params.row[sections[index]].substring(dashIndex + 1)
              : params[section[index]];
        }
        let combined = section.concat(" ", firstSubject);
        if (section === params.row[subject]) {
          return `${combined} ${sem}_${year}`;
        } else if (section === "") {
          return "";
        }
      },
      width: 300,
    },
    {
      field: `role${index + 1}`,
      header: `Role ${index + 1}`,
      width: 500,
      renderCell: (params) => <div>{params.row[subject] ? "student" : ""}</div>,
      valueGetter: (params) => (params.row[subject] ? "student" : ""),
    },
  ]),
];

const Page = () => {
  const [data, setData] = useState([]);
  const [sem, setSem] = useState();
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setData(parsedData);
      setIsLoading(false);
    };
  };

  const handleSem = (e) => {
    setSem(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        sx={{ width: 500, display: "flex", justifyContent: "space-between" }}
      >
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Sems</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sem}
            label="Sem"
            onChange={handleSem}
          >
            <MenuItem value={"1STSEM"}>1st</MenuItem>
            <MenuItem value={"2NDSEM"}>2nd</MenuItem>
            <MenuItem value={"MidYear"}>MidYear</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 200 }}>
          <InputLabel>Year</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="year"
            onChange={handleYear}
          >
            <MenuItem value="SY22-23">SY22-23</MenuItem>
            <MenuItem value="SY23-24">SY23-24</MenuItem>
            <MenuItem value="SY24-25">SY24-25</MenuItem>
            <MenuItem value="SY25-26">SY25-26</MenuItem>
            <MenuItem value="SY26-27">SY26-27</MenuItem>
            <MenuItem value="SY27-28">SY27-28</MenuItem>
            <MenuItem value="SY28-29">SY28-29</MenuItem>
            <MenuItem value="SY29-30">SY29-30</MenuItem>
            <MenuItem value="SY30-31">SY30-31</MenuItem>
            <MenuItem value="SY31-32">SY31-32</MenuItem>
            <MenuItem value="SY32-33">SY32-33</MenuItem>
          </Select>
        </FormControl>

        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>

      {isLoading ? (
        <>loading...</>
      ) : (
        <div sx={{ height: "100%", width: "100%" }}>
          {data.length > 0 && (
            <DataGrid
              getRowId={(row) => row.username}
              rows={data}
              columns={SampleColumnComponent({ sem, year })}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  csvOptions: {
                    fileName: `v2_Converted_LWSIS_${sem}_${year}`,
                    utf8WithBom: true,
                  },
                },
              }}
            />
          )}
        </div>
      )}
    </ThemeProvider>
  );
};

export default Page;
