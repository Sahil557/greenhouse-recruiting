export interface Interview {
  type: string;
  manualLink: string;
  autoLink: string;
}

export interface AdditionalInfo {
  availabilityText: string;
  requestLink: string;
}

export interface Candidate {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  jobCode: string;
  statusNotes: string;
  statusActionText: string;
  statusActionLink: string;
  designation: string;
  additionalInfo?: AdditionalInfo;
  interviews?: Interview[];
}

export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface FilterState {
  search: string;
  sort: 'activity_desc' | 'activity_asc' | 'name_asc' | 'name_desc';
  application_type: string[];
  jobs: string[];
  sources: string[];
}
