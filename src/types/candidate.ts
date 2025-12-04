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

  // Filterable fields
  applicationType?: 'full-time' | 'part-time' | 'contract';
  jobCategory?: 'engineering' | 'design' | 'marketing';
  crm?: 'hubspot' | 'salesforce' | 'zoho';
  profileStatus?: 'verified' | 'unverified';
  source?: 'referral' | 'job-board' | 'social-media';
  responsibility?: 'manager' | 'team-lead' | 'contributor';
  pipelineTask?: 'pending' | 'in-progress' | 'completed';
  education?: 'high-school' | 'bachelor' | 'master' | 'phd';
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
  applicationType: Candidate['applicationType'][];
  jobs: Candidate['jobCategory'][];
  sources: Candidate['source'][];
  profileStatus: Candidate['profileStatus'][];
  responsibility: Candidate['responsibility'][];
  pipelineTask: Candidate['pipelineTask'][];
  education: Candidate['education'][];
}
