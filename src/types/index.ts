export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "parent";
  profileComplete: boolean;
  createdAt: string;
}

// File: src/types/index.ts

export interface StudentProfile {
  // We make these optional (?) because they might not exist
  // until the profile is actually saved to the database.
  id?: string;
  userId?: string;

  academicBackground: {
    currentGrade: string;
    gpa: number;
    subjects: string[];
    testScores: {
      sat?: number;
      act?: number;
      toefl?: number;
      ielts?: number;
    };
  };
  interests: string[];
  careerGoals: string[];
  extracurriculars: string[];
  financialConstraints: {
    budget: string;
    needFinancialAid: boolean;
    scholarshipInterest: boolean;
  };
  preferences: {
    countries: string[];
    studyLevel: string;
    fieldOfStudy: string[];
  };
  // The interface expects numbers, but forms often handle strings.
  // We allow both here to prevent type errors during selection.
  selectedUniversities: number[];
  assessmentComplete: boolean;
}

export interface AssessmentResult {
  universityRecommendations: UniversityRecommendation[];
  scholarshipEligibility: ScholarshipEligibility[];
  improvementSuggestions: string[];
  overallScore: number;
}

export interface UniversityRecommendation {
  universityId: number;
  universityName: string;
  admissionChance: number;
  matchScore: number;
  reasons: string[];
  requirements: string[];
}

export interface ScholarshipEligibility {
  scholarshipName: string;
  universityName: string;
  eligible: boolean;
  amount: string;
  requirements: string[];
  deadline: string;
}

export interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  expertise: string[];
  experience: string;
  education: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: "available" | "busy" | "unavailable";
  profileImage: string;
  bio: string;
  specializations: string[];
  languages: string[];
  timezone: string;
  responseTime: string;
  totalSessions: number;
  joinedDate: string;
}

export interface MentorSession {
  id: string;
  mentorId: string;
  studentId: string;
  date: string;
  time: string;
  duration: number;
  type: "video" | "chat" | "phone";
  status: "scheduled" | "completed" | "cancelled";
  topic: string;
  notes?: string;
  rating?: number;
  review?: string;
  amount: number;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: "merit" | "need-based" | "demographic" | "field-specific";
  amount: string;
  deadline: string;
  eligibility: {
    gpa?: number;
    fieldOfStudy?: string[];
    nationality?: string[];
    demographics?: string[];
    financialNeed?: boolean;
  };
  requirements: string[];
  description: string;
  applicationUrl: string;
  renewable: boolean;
  numberOfAwards: number;
  applicationStatus?:
    | "not-applied"
    | "applied"
    | "under-review"
    | "accepted"
    | "rejected";
  matchScore?: number;
}

