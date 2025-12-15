import  { useEffect, useState, type ChangeEvent } from "react";
// Ensure you have this context file, or remove this line if testing without auth
import { useAuth } from "../contexts/AuthContext"; 
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
  Share,
  Star,
  GraduationCap,
} from "lucide-react";

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
  image?: string | null; // Can be a URL string or null
  likes: number;
  comments: Comment[];
  liked: boolean;
  shares: number;
}

// --- Initial Data ---

const initialStudentData: StudentData = {
  id: "student-123",
  coverPhoto: "./img/certificate-3.jpg",
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

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-06T10:30:00Z",
    content:
      "Honored to secure the First Position in Uniglobe Trade IT Up 1.0! 🥇 A huge thank you to the Uniglobe Think Tank Club for organizing such an insightful event. ",
    image: "./img/certificate-1.jpg",
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
    image: "./img/certificate-2.jpg",
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
    timestamp: "2025-08-06T10:30:00Z",
    content:
      "Honored to secure the First Position in Uniglobe Trade IT Up 1.0! 🥇 A huge thank you to the Uniglobe Think Tank Club for organizing such an insightful event. ",
    image: "./img/certificate-3.jpg",
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
    id: 4,
    author: "Nishav Man Singh Pradhan",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50",
    timestamp: "2025-08-05T14:20:00Z",
    content:
      "Hard work pays off! 🏆 Bringing home the Winner's Trophy from Uniglobe Hackathon 1.0 (2082). Proud of the team and what we built in 48 hours. The medals look great too! 🥇🥇",
    image: "./img/certificate-4.jpg",
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
];

function App() {
  // If useAuth returns `any` in your project, this is fine. 
  // If it's typed, user will have User type.
  const { user } = useAuth();

  // Main state with Types
  const [studentData, setStudentData] = useState<StudentData>(initialStudentData);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPostForm, setShowNewPostForm] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<string>("");

  // Image upload state for new post
  const [newPostImageFile, setNewPostImageFile] = useState<File | null>(null);
  const [newPostImagePreview, setNewPostImagePreview] = useState<string | null>(null);

  // Unused state variables (can be removed if not implemented yet)
  // const [editingAbout, setEditingAbout] = useState<boolean>(false);
  // const [aboutText, setAboutText] = useState<string>(studentData.about);

  // When image file changes, create/revoke preview URL
  useEffect(() => {
    if (!newPostImageFile) {
      setNewPostImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(newPostImageFile);
    setNewPostImagePreview(objectUrl);

    // cleanup: revoke when file changes or component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [newPostImageFile]);

  // Helpers
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    // Handle specific date format or just pass standard date
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    // getTime() returns number of milliseconds
    const diffInHours = (now.getTime() - past.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  // About save (currently unused in JSX, but typed for future use)
  /* const handleAboutSave = () => {
    if (aboutText.trim().length > 0) {
      setStudentData((prev) => ({ ...prev, about: aboutText }));
      setEditingAbout(false);
    }
  };
  */

  // Handle selecting an image file
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // optional: validate size/type here
    setNewPostImageFile(file);
  };

  // Remove selected image from the form
  const handleRemoveSelectedImage = () => {
    setNewPostImageFile(null);
    setNewPostImagePreview(null);
  };

  // Create a post (with optional image)
  const handleCreatePost = () => {
    if (newPost.trim().length === 0 && !newPostImageFile) return;

    const newPostObj: Post = {
      id: Date.now(),
      author: studentData.name,
      authorAvatar: studentData.profilePicture,
      timestamp: new Date().toISOString(),
      content: newPost,
      likes: 0,
      comments: [],
      liked: false,
      shares: 0,
      // store preview url so it shows immediately; for production you'd upload and store remote URL
      image: newPostImagePreview || null,
    };

    setPosts((prev) => [newPostObj, ...prev]);
    setStudentData((prev) => ({ ...prev, postsCount: prev.postsCount + 1 }));

    // Reset form
    setNewPost("");
    setShowNewPostForm(false);
    setNewPostImageFile(null);
    setNewPostImagePreview(null);
  };

  // Toggle like on a post
  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div
                className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"
                style={{
                  backgroundImage: `url(${studentData.coverPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="px-4 pb-4">
                <div className="flex flex-col items-center -mt-10">
                  <img
                    src={studentData.profilePicture}
                    alt={studentData.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                  <h3 className="mt text-lg font-semibold text-gray-900 text-center">
                    {user?.name || studentData.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mt-1">{studentData.headline}</p>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {studentData.location}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Followers</span>
                    <span className="text-blue-600 font-medium">{studentData.followers}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Social Links</h4>
                  <div className="flex space-x-3">
                    <a href={studentData.socialLinks.linkedin} className="text-blue-600 hover:text-blue-800">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={studentData.socialLinks.github} className="text-gray-700 hover:text-gray-900">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={studentData.socialLinks.twitter} className="text-blue-400 hover:text-blue-600">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={studentData.socialLinks.instagram} className="text-pink-600 hover:text-pink-800">
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
                  <a href={`mailto:${studentData.email}`} className="text-blue-600 hover:underline">
                    {studentData.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-3" />
                  <a href={studentData.website} className="text-blue-600 hover:underline">
                    {studentData.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
              </div>

              <div className="space-y-6">
                {studentData.experience.map((exp) => (
                  <div key={exp.id} className="flex space-x-3">
                    <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.period} · {exp.duration}
                      </p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
              </div>

              <div className="space-y-6">
                {studentData.education.map((edu) => (
                  <div key={edu.id} className="flex space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{edu.school}</h4>
                      <p className="text-gray-700">{edu.degree}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                      )}
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
              </div>

              <div className="space-y-4">
                {studentData.skills.slice(0, 3).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{skill.endorsements} endorsements</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Show all {studentData.skills.length} skills →
                </button>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
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

          {/* RIGHT / MAIN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Activity</h3>
                <button
                  onClick={() => setShowNewPostForm((s) => !s)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  Create a post
                </button>
              </div>

              {/* New Post Form */}
              {showNewPostForm && (
                <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    rows={3}
                  />

                  {/* Image upload controls */}
                  <div className="mt-3 flex items-center justify-between space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                      <div className="px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm">
                        Upload image
                      </div>
                    </label>

                    {newPostImagePreview ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-24 rounded overflow-hidden border border-gray-200">
                          <img src={newPostImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={handleRemoveSelectedImage}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No image selected</div>
                    )}
                  </div>

                  <div className="flex items-center justify-end mt-4 space-x-2">
                    <button
                      onClick={() => {
                        setShowNewPostForm(false);
                        setNewPost("");
                        setNewPostImageFile(null);
                        setNewPostImagePreview(null);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={newPost.trim().length === 0 && !newPostImageFile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}

              {/* Posts list */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <article key={post.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-md uppercase">{user?.name || post.author}</h4>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-lg" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 text-sm ${post.liked ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                          <span>{post.likes}</span>
                        </button>
                        {/* <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments.length}</span>
                        </button> */}
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                          <Share className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Show all posts →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;