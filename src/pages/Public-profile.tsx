import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Heart,
  MessageCircle,
  Share,
  Star,
  GraduationCap,
  Award,
  UserPlus,
} from "lucide-react";


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

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string | null;
  url: string;
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
  certificates: Certificate[];
  skills: Skill[];
  languages: Language[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  liked: boolean;
  shares: number;
}

// --- INITIAL DATA ---

const initialStudentData: StudentData = {
  id: "student-nishav",
  coverPhoto:
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=400&dpr=1",
  profilePicture:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  name: "Nishav Man Singh Pradhan",
  headline: "First Position @ Trade IT Up 1.0 | Hackathon Winner | Uniglobe SS",
  school: "Uniglobe Secondary School / College",
  location: "Kamaladi, Kathmandu",
  dateOfBirth: "2006-08-15",
  website: "https://nishav-portfolio.com",
  email: "nishav.pradhan@uniglobe.edu.np",
  socialLinks: {
    linkedin: "https://linkedin.com/in/nishavpradhan",
    github: "https://github.com/nishavpradhan",
    twitter: "https://twitter.com/nishav",
    instagram: "https://instagram.com/nishav",
  },
  followers: 1042,
  following: 450,
  postsCount: 12,
  certificatesCount: 5,
  connections: 500,
  about:
    "Dedicated student at Uniglobe Secondary School with a passion for Technology and Business. Recently secured First Position in 'Trade IT Up 1.0' and won the Uniglobe Hackathon 2082. Active member of the Uniglobe Think Tank Club and IT Club. Always looking for new challenges in coding and entrepreneurship.",
  education: [
    {
      id: 1,
      school: "Uniglobe Secondary School",
      degree: "+2 Science / Management",
      period: "2080 - Present",
      description:
        "Active member of Think Tank Club. Winner of Hackathon 1.0 and Trade IT Up 1.0.",
      gpa: "3.90/4.0",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Event Participant & Winner",
      company: "Uniglobe Think Tank Club",
      period: "Shrawan 2082",
      duration: "1 mo",
      location: "Kamaladi, Kathmandu",
      description:
        "Competed in business and tech simulation 'Trade IT Up 1.0' and secured 1st position among peer groups.",
      logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 2,
      title: "Hackathon Team Lead",
      company: "Uniglobe IT Club",
      period: "2082",
      duration: "1 mo",
      location: "Kathmandu",
      description:
        "Led team to victory in Uniglobe Hackathon 1.0. Developed a solution for sustainable trading.",
      logo: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
  ],
  certificates: [
    {
      id: 1,
      name: "First Position - Trade IT Up 1.0",
      issuer: "Uniglobe Think Tank Club",
      date: "21 Shrawan 2082",
      credentialId: "TIU-2082-01",
      url: "#",
    },
    {
      id: 2,
      name: "Winner - Uniglobe Hackathon 1.0",
      issuer: "Uniglobe IT Club",
      date: "2082",
      credentialId: "HACK-2082-WIN",
      url: "#",
    },
    {
      id: 3,
      name: "Certificate of Participation",
      issuer: "Uniglobe ECA/CCA",
      date: "2082",
      credentialId: null,
      url: "#",
    },
  ],
  skills: [
    { name: "Public Speaking", endorsements: 45 },
    { name: "Team Leadership", endorsements: 40 },
    { name: "Problem Solving", endorsements: 35 },
    { name: "Project Management", endorsements: 20 },
    { name: "Hackathons", endorsements: 50 },
  ],
  languages: [
    { name: "Nepali", level: "Native or bilingual proficiency" },
    { name: "English", level: "Professional working proficiency" },
  ],
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-06T10:30:00Z",
    content:
      "Honored to secure the First Position in Uniglobe Trade IT Up 1.0! 🥇 A huge thank you to the Uniglobe Think Tank Club for organizing such an insightful event. #UnitedInDiversity #TogetherForInclusion #Uniglobe #TradeITUp #Winner",
    image: "/img/certificate-1.jpg", // Ensure these paths exist in public folder
    likes: 245,
    comments: [
      {
        id: 1,
        author: "Ganesh Regmi, PhD",
        content: "Excellent achievement Nishav! Keep it up.",
        timestamp: "2025-08-06T11:00:00Z",
      },
    ],
    liked: true,
    shares: 12,
  },
  {
    id: 2,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-05T14:20:00Z",
    content:
      "Hard work pays off! 🏆 Bringing home the Winner's Trophy from Uniglobe Hackathon 1.0 (2082). Proud of the team and what we built in 48 hours. The medals look great too! 🥇🥇",
    image: "/img/certificate-2.jpg",
    likes: 189,
    comments: [
      {
        id: 1,
        author: "Yunik Subedi",
        content: "We did it! 🚀",
        timestamp: "2025-08-05T15:30:00Z",
      },
    ],
    liked: true,
    shares: 25,
  },
  {
    id: 3,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-04T09:15:00Z",
    content:
      "Check out the hardware! 🥇 Uniglobe Secondary School medals for the win. #Gold #Champion #UniglobeSS",
    image: "/img/certificate-3.jpg",
    likes: 150,
    comments: [],
    liked: false,
    shares: 5,
  },
  {
    id: 4,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-04T09:15:00Z",
    content:
      "Check out the hardware! 🥇 Uniglobe Secondary School medals for the win. #Gold #Champion #UniglobeSS",
    image: "/img/certificate-4.jpg",
    likes: 150,
    comments: [],
    liked: false,
    shares: 5,
  },
];

// --- COMPONENT ---

function ProfileDetails() {
  // If useAuth doesn't return exactly what you need yet, you can comment this out
  // const { user } = useAuth(); 

  // State management with Types
  const [studentData,] = useState<StudentData>(initialStudentData);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPostForm, setShowNewPostForm] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<string>("");

  // Handle post creation
  // const handleCreatePost = () => {
  //   if (newPost.trim().length > 0) {
  //     const post: Post = {
  //       id: Date.now(),
  //       author: studentData.name,
  //       authorAvatar: studentData.profilePicture,
  //       timestamp: new Date().toISOString(),
  //       content: newPost,
  //       likes: 0,
  //       comments: [],
  //       liked: false,
  //       shares: 0,
  //     };
  //     setPosts([post, ...posts]);
  //     setStudentData((prev) => ({
  //       ...prev,
  //       postsCount: prev.postsCount + 1,
  //     }));
  //     setNewPost("");
  //     setShowNewPostForm(false);
  //   }
  // };

  // Handle post interactions
  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    // Basic check if it's a standard date string
    if (dateString.includes("-") || dateString.includes(":")) {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return dateString; // Return as is if it's "21 Shrawan 2082"
  };

  // Format time ago helper
  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInHours = (now.getTime() - past.getTime()) / (1000 * 60 * 60);

    if (isNaN(diffInHours)) return "Recently"; // Handle non-standard dates
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Cover Photo */}
              <div
                className="h-40 bg-gradient-to-r from-blue-900 to-blue-600"
                style={{
                  backgroundImage: `url(${studentData.coverPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Profile Content */}
              <div className="px-4 pb-4">
                <div className="flex flex-col items-start -mt-10">
                  <img
                    src={studentData.profilePicture}
                    alt={studentData.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 text-center">
                    {studentData.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {studentData.headline}
                  </p>
                  <div className="flex items-center justify-between w-full mt-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{studentData.location}</span>
                    </div>

                    <button className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 border border-blue-600 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800 transition-colors">
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Followers</span>
                    <span className="text-blue-600 font-medium">
                      {studentData.followers}
                    </span>
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
              </div>
              <div className="space-y-6">
                {studentData.education.map((edu) => (
                  <div key={edu.id} className="flex space-x-3">
                    <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{edu.school}</h4>
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

            {/* Certificates Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certificates
                </h3>
              </div>
              <div className="space-y-4">
                {studentData.certificates.map((cert) => (
                  <div key={cert.id} className="flex space-x-3">
                    <div className="w-10 h-10 bg-yellow-50 rounded flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-gray-700">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">
                        Issued {cert.date}
                      </p>
                      {cert.credentialId && (
                        <p className="text-xs text-gray-400 mt-1">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
              </div>
              <div className="space-y-4">
                {studentData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
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
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Languages
                </h3>
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

          {/* Main Content (Right Side) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity Feed
                </h3>
                {/* <button
                  onClick={() => setShowNewPostForm(!showNewPostForm)}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {showNewPostForm ? "Close" : "Create Post"}
                </button> */}
              </div>

              {/* New Post Form */}
              {showNewPostForm && (
                <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                  <textarea
                    value={newPost}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNewPost(e.target.value)
                    }
                    placeholder="Share your achievement..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 bg-white"
                    rows={3}
                  />
                  <div className="flex items-center justify-end mt-4 space-x-2">
                    <button
                      onClick={() => {
                        setShowNewPostForm(false);
                        setNewPost("");
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    {/* <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      Post
                    </button> */}
                  </div>
                </div>
              )}

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {post.author}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(post.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full max-h-96 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 text-sm ${
                            post.liked
                              ? "text-red-600"
                              : "text-gray-600 hover:text-red-600"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              post.liked ? "fill-current" : ""
                            }`}
                          />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments.length}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                          <Share className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;