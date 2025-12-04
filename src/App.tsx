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
  Modal,
  Column,
  Icon,
} from "./components";

import { mockCandidates } from "./mock-data/candidates";
import type { Candidate } from "./types/candidate";
import { sidebarItems } from "./mock-data/sidebarItems";
import { sortOptions } from "./mock-data/sortOptions";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);

  const [newCandidate, setNewCandidate] = useState({
    name: "",
    company: "",
    jobTitle: "",
    jobCode: "",
    statusNotes: "",
    statusActionText: "",
    designation: "",
  });

  const handleChange = (field: string, value: string) => {
    setNewCandidate((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (section: string, value: string) => {
    if (section === "reset") {
      setSelectedOptions({});
      return;
    }
    setSelectedOptions((prev) => ({ ...prev, [section]: value }));
  };

  const isFormValid = Object.values(newCandidate).every(
    (value) => value.trim() !== ""
  );

  const chips = useMemo(() => {
    return Object.entries(selectedOptions)
      .filter(([, value]) => value)
      .map(([section, value]) => {
        const sectionItem = sidebarItems.find((item) => item.title === section);
        const option = sectionItem?.options.find((opt) => opt.value === value);
        return { label: option?.label || value, key: section };
      });
  }, [selectedOptions]);

  const handleAddCandidate = () => {
    const id = crypto.randomUUID();
    const newEntry = { id, ...newCandidate, statusActionLink: "#" };
    setCandidates((prev) => [newEntry, ...prev]);
    setNewCandidate({
      name: "",
      company: "",
      jobTitle: "",
      jobCode: "",
      statusNotes: "",
      statusActionText: "",
      designation: "",
    });
    setShowAddModal(false);
  };

  const itemsPerPage = 10;

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    if (searchValue.trim()) {
      const lowerSearch = searchValue.toLowerCase();
      filtered = filtered.filter((c) =>
        Object.values(c).some(
          (val) => val && val.toString().toLowerCase().includes(lowerSearch)
        )
      );
    }

    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (!value) return;
      let candidateKey: keyof Candidate | undefined;
      switch (key) {
        case "Application Type":
          candidateKey = "applicationType";
          break;
        case "Jobs":
          candidateKey = "jobTitle";
          break;
        case "CRM":
          candidateKey = "crm";
          break;
        case "Profile Details":
          candidateKey = "designation";
          break;
        case "Source":
          candidateKey = "source";
          break;
        case "Responsibility":
          candidateKey = "responsibility";
          break;
        case "Pipeline Tasks":
          candidateKey = "statusActionText";
          break;
        case "Education":
          candidateKey = "education";
          break;
      }
      if (candidateKey) {
        filtered = filtered.filter(
          (c) => c[candidateKey]?.toString() === value
        );
      }
    });

    if (sortOption?.value) {
      const [field, order] = sortOption.value.split("-");
      const key = field as keyof Candidate;
      filtered.sort((a, b) => {
        const aVal = (a[key] ?? "").toString();
        const bVal = (b[key] ?? "").toString();
        const comparison = aVal.localeCompare(bVal, undefined, {
          numeric: true,
          sensitivity: "base",
        });
        return order === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [candidates, searchValue, selectedOptions, sortOption]);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredCandidates.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCandidates, page]);

  const downloadReport = (format: "csv" | "json") => {
    const data = filteredCandidates;
    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "candidates.json";
      link.click();
    } else {
      const headers = Object.keys(data[0] || {}).join(",");
      const rows = data
        .map((c) =>
          Object.values(c)
            .map((v) => `"${v}"`)
            .join(",")
        )
        .join("\n");
      const csv = [headers, rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "candidates.csv";
      link.click();
    }
  };

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
          sortValue={sortOption}
          onSortChange={setSortOption}
        />

        <main className="flex-1 px-6">
          <Row>
            <Typography className="text-[13.78px] leading-[19.5px] font-normal text-nowrap">
              Showing {filteredCandidates.length} candidate applications
            </Typography>

            <Row className="gap-2">
              <div className="relative">
                <Button
                  endIcon="ArrowDown2"
                  variant="outlined"
                  className="text-[13.78px] py-1.25 gap-0.5 text-nowrap"
                  width={20}
                  height={20}
                  onClick={() => setShowReportDropdown((prev) => !prev)}
                >
                  Generate Report
                </Button>

                {showReportDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => downloadReport("csv")}
                    >
                      Download CSV
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => downloadReport("json")}
                    >
                      Download JSON
                    </button>
                  </div>
                )}
              </div>

              <Button
                startIcon="Plus"
                variant="outlined"
                className="text-[13.78px] py-1.25 gap-0.5 text-nowrap"
                width={11}
                height={11}
                onClick={() => setShowAddModal(true)}
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

          {filteredCandidates.length === 0 ? (
            <Column className="space-y-3 py-10 bg-white rounded-xl">
              <div className="text-center text-abyss text-3xl">
                <Icon name="NoCandidate" />
                OOPS!
              </div>
              <div className="text-center text-slate text-xl">
                No candidate data available.
              </div>
            </Column>
          ) : (
            <>
              <Table data={paginatedCandidates} />

              <Pagination
                totalPages={Math.ceil(filteredCandidates.length / itemsPerPage)}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>

      {showAddModal && (
        <Modal
          title="Add Candidate"
          onDecline={() => setShowAddModal(false)}
          onAccept={handleAddCandidate}
          closeOnBackdropClick={true}
          acceptDisabled={!isFormValid}
        >
          <div className="space-y-4 px-1">
            {[
              "name",
              "company",
              "jobTitle",
              "jobCode",
              "statusNotes",
              "statusActionText",
              "designation",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={newCandidate[field as keyof typeof newCandidate]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-abyss placeholder:text-slate text-sm rounded-xs px-3 py-1 w-full"
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
