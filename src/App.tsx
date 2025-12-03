import { useState, useMemo } from "react";
import "./App.css";
import {
  Button,
  Chip,
  Header,
  Pagination,
  Row,
  Sidebar,
  Typography,
  Table,
} from "./components";
import { mockCandidates } from "./mock-data/candidates";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (section: string, value: string) => {
    if (section === "reset") {
      setSelectedOptions({});
      return;
    }
    setSelectedOptions((prev) => ({ ...prev, [section]: value }));
  };

  const chips = useMemo(() => {
    const sidebarItems = [
      {
        title: "Application Type",
        options: [
          { label: "Full-Time", value: "full-time" },
          { label: "Part-Time", value: "part-time" },
          { label: "Contract", value: "contract" },
        ],
      },
      {
        title: "Jobs",
        options: [
          { label: "Engineering", value: "engineering" },
          { label: "Design", value: "design" },
          { label: "Marketing", value: "marketing" },
        ],
      },
      {
        title: "CRM",
        options: [
          { label: "HubSpot", value: "hubspot" },
          { label: "Salesforce", value: "salesforce" },
          { label: "Zoho", value: "zoho" },
        ],
      },
      {
        title: "Profile Details",
        options: [
          { label: "Verified", value: "verified" },
          { label: "Unverified", value: "unverified" },
        ],
      },
      {
        title: "Source",
        options: [
          { label: "Referral", value: "referral" },
          { label: "Job Board", value: "job-board" },
          { label: "Social Media", value: "social-media" },
        ],
      },
      {
        title: "Responsibility",
        options: [
          { label: "Manager", value: "manager" },
          { label: "Team Lead", value: "team-lead" },
          { label: "Contributor", value: "contributor" },
        ],
      },
      {
        title: "Pipeline Tasks",
        options: [
          { label: "Pending", value: "pending" },
          { label: "In Progress", value: "in-progress" },
          { label: "Completed", value: "completed" },
        ],
      },
      {
        title: "Education",
        options: [
          { label: "High School", value: "high-school" },
          { label: "Bachelor's", value: "bachelor" },
          { label: "Master's", value: "master" },
          { label: "PhD", value: "phd" },
        ],
      },
    ];

    return Object.entries(selectedOptions)
      .filter(([, value]) => value)
      .map(([section, value]) => {
        const sectionItem = sidebarItems.find((item) => item.title === section);
        const option = sectionItem?.options.find((opt) => opt.value === value);
        return { label: option?.label || value, key: section };
      });
  }, [selectedOptions]);

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      <Header />
      <h1 className="text-[34.59px] font-normal text-[#15372c] px-6 pt-4 pb-3 leading-[46.67px]">
        All Candidates
      </h1>
      <div className="flex">
        <Sidebar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />

        <main className="flex-1 px-6">
          <Row>
            <Typography className="text-[13.78px] leading-[19.5px] font-normal text-nowrap">
              Showing 50 candidate applications
            </Typography>
            <Row className="gap-2">
              <Button
                endIcon="ArrowDown2"
                variant="outlined"
                className="text-[13.78px] py-1.25 gap-0.5 text-nowrap"
                width={20}
                height={20}
              >
                Generate Report
              </Button>
              <Button
                startIcon="Plus"
                variant="outlined"
                className="text-[13.78px] py-1.25 gap-0.5 text-nowrap"
                width={11}
                height={11}
              >
                Add Candidate
              </Button>
              <Button
                variant="outlined"
                className="text-[13.78px] py-1.25 text-nowrap"
              >
                Bulk Actions
              </Button>
            </Row>
          </Row>

          <Row className="my-2 gap-2 justify-start">
            {chips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onRemove={() => handleOptionChange(chip.key, "")}
              />
            ))}
          </Row>

          <Table data={mockCandidates} />
          <Pagination
            totalPages={23}
            currentPage={page}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
