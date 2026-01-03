import { useState } from "react";
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Edit3,
  Plus,
  Star,
  GraduationCap,
  UserPlus,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Types & Interfaces ---

interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  period: string;
  description: string;
  gpa?: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  logo: string;
}

interface Skill {
  name: string;
  endorsements: number;
}

interface Language {
  name: string;
  level: string;
}

interface StudentData {
  id: string;
  coverPhoto: string;
  profilePicture: string;
  name: string;
  headline: string;
  school: string;
  location: string;
  dateOfBirth: string;
  website: string;
  email: string;
  socialLinks: SocialLinks;
  followers: number;
  following: number;
  postsCount: number;
  certificatesCount: number;
  connections: number;
  about: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
}

interface SuggestedConnection {
  id: number;
  name: string;
  role: string;
  avatar: string;
  mutuals: number;
  verified: boolean;
}

// --- Initial Data ---

const initialStudentData: StudentData = {
  id: "student-123",
  coverPhoto:
    "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=400&dpr=1",
  profilePicture:
    "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  name: "Emma Rodriguez",
  headline: "Social Work Major & Basketball Team Captain | Class of 2025",
  school: "Massachusetts Institute of Technology",
  location: "Cambridge, MA",
  dateOfBirth: "2003-03-15",
  website: "https://emmasocialimpact.com",
  email: "emma.rodriguez@mit.edu",
  socialLinks: {
    linkedin: "https://linkedin.com/in/emmarodriguez",
    github: "https://github.com/emmarodriguez",
    twitter: "https://twitter.com/emmarodriguez",
    instagram: "https://instagram.com/emmarodriguez",
  },
  followers: 2847,
  following: 892,
  postsCount: 67,
  certificatesCount: 12,
  connections: 238,
  about:
    "Passionate social work student and student-athlete dedicated to creating positive change in communities. As team captain of the MIT Women's Basketball team, I lead both on and off the court. Currently working on my senior thesis on youth development programs and seeking opportunities in nonprofit leadership and community organizing.",
  education: [
    {
      id: 1,
      school: "Massachusetts Institute of Technology",
      degree: "Bachelor of Science in Social Work",
      period: "2021 - 2025",
      description:
        "Focus on Community Development and Youth Services. Dean's List for 4 consecutive semesters. Basketball Team Captain (2023-2025).",
      gpa: "3.95/4.0",
    },
    {
      id: 2,
      school: "Lincoln High School",
      degree: "High School Diploma",
      period: "Jun 2021",
      description:
        "Valedictorian, National Honor Society, Student Body President, Varsity Basketball MVP",
      gpa: "4.0/4.0",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Youth Program Coordinator",
      company: "Cambridge Community Center",
      period: "Sep 2023 - Present",
      duration: "1 yr 4 mos",
      location: "Cambridge, MA",
      description:
        "Lead youth development programs serving 150+ at-risk teenagers. Coordinate mentorship initiatives and organize community events.",
      logo: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 2,
      title: "Basketball Team Captain",
      company: "MIT Women's Basketball",
      period: "Aug 2023 - Present",
      duration: "1 yr 5 mos",
      location: "Cambridge, MA",
      description:
        "Lead team of 15 student-athletes. Organize team-building activities and community service initiatives.",
      logo: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 3,
      title: "Mental Health Peer Counselor",
      company: "MIT Student Wellness",
      period: "Jan 2023 - Aug 2023",
      duration: "8 mos",
      location: "Cambridge, MA",
      description:
        "Provided peer support and crisis intervention for fellow students. Facilitated support groups and wellness workshops.",
      logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
  ],
  skills: [
    { name: "Community Organizing", endorsements: 34 },
    { name: "Team Leadership", endorsements: 28 },
    { name: "Public Speaking", endorsements: 25 },
    { name: "Event Planning", endorsements: 22 },
    { name: "Grant Writing", endorsements: 18 },
    { name: "Youth Mentoring", endorsements: 31 },
    { name: "Crisis Intervention", endorsements: 15 },
    { name: "Program Development", endorsements: 12 },
  ],
  languages: [
    { name: "English", level: "Native or bilingual proficiency" },
    { name: "Spanish", level: "Professional working proficiency" },
    { name: "French", level: "Elementary proficiency" },
  ],
};

const suggestedConnections: SuggestedConnection[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior UX Designer at Adobe",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    mutuals: 12,
    verified: true,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Full Stack Developer",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    mutuals: 4,
    verified: false,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Product Manager @ TechFlow",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    mutuals: 8,
    verified: false,
  },
];

// --- Component ---

function ProfileDetails() {
  // State management
  const [studentData] = useState<StudentData>(initialStudentData);

  // Format date helper
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar (Profile Info) - Takes up 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Cover Photo */}
              <div
                className="h-50 bg-gradient-to-r from-blue-600 to-purple-600"
                style={{
                  backgroundImage: `url(${studentData.coverPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Profile Content */}
              <div className="p-6">
                <div className="flex flex-col items-start -mt-15">
                  <img
                    src={studentData.profilePicture}
                    alt={studentData.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 text-center">
                    {studentData.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mt-1">
                    {studentData.headline}
                  </p>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {studentData.location}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Followers</span>
                    <span className="text-blue-600 font-medium">127</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Social Links
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href={studentData.socialLinks.linkedin}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={studentData.socialLinks.github}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={studentData.socialLinks.twitter}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={studentData.socialLinks.instagram}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  Born {formatDate(studentData.dateOfBirth)}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <a
                    href={`mailto:${studentData.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {studentData.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-3" />
                  <a
                    href={studentData.website}
                    className="text-blue-600 hover:underline"
                  >
                    {studentData.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience
                </h3>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {studentData.experience.map((exp) => (
                  <div key={exp.id} className="flex space-x-3">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.period} · {exp.duration}
                      </p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education
                </h3>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {studentData.education.map((edu) => (
                  <div key={edu.id} className="flex space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {edu.school}
                      </h4>
                      <p className="text-gray-700">{edu.degree}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 mt-1">
                          GPA: {edu.gpa}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 mt-2">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {studentData.skills.slice(0, 3).map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {skill.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {skill.endorsements} endorsements
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Show all 8 skills →
                </button>
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Languages
                </h3>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {studentData.languages.map((lang, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{lang.name}</h4>
                    <p className="text-sm text-gray-600">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Connect People) - Takes up 1/3 width */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between mb-4 bg-[var(--bg-main)] border border-gray-200 rounded-xl p-5">
              <h4 className="text-xl font-semibold text-gray-900">Activity</h4>
              <Link
                to="/user/profile-post"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                Create a post
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-md">People you may know</h4>
              <p className="text-gray-500 mb-4">From your industry</p>

              <div className="space-y-4">
                {suggestedConnections.map((person) => (
                  <div
                    key={person.id}
                    className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            <Link
                              to="/user/profile-public"
                              className="hover:text-blue-600 hover:underline transition-colors duration-200"
                            >
                              {person.name}
                            </Link>
                          </h4>

                          {person.verified && (
                            <CheckCircle className="w-3 h-3 text-gray-500 fill-current" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                          {person.role}
                        </p>

                        <button className="mt-3 text-end flex items-center justify-center space-x-2 px-4 py-1.5 border border-gray-600 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 transition-colors">
                          <UserPlus className="w-4 h-4" />
                          <span>Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement / Promo Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
              <img
                src="/img/sideadd.jpg"
                alt="Advertisement"
                className="h-full w-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;