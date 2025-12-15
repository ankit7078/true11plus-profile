import { useState, type ReactNode } from "react";
import {
  Trophy,
  Users,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  CheckCircle2,
} from "lucide-react";

/* =======================
   TYPES
======================= */

interface Module {
  id: number;
  category: string;
  tag: string;
  title: string;
  description: string;
  tasks: string[];
  tags: string[];
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

/* =======================
   DATA
======================= */

// const universities: string[] = [
//   "HARVARD",
//   "OXFORD",
//   "CAMBRIDGE",
//   "STANFORD",
//   "MIT",
//   "YALE",
// ];

const modules: Module[] = [
  {
    id: 1,
    category: "Module 1",
    tag: "Core",
    title: "The Global Young Leaders Conference",
    description:
      "An intensive introduction to global leadership. We break down the fundamentals of international relations.",
    tasks: [
      "Introduction to International Relations & Diplomacy",
      "Workshop: UN Sustainable Development Goals",
      "Case Study: Geopolitical Conflicts",
      "Assignment: Policy Brief Draft",
    ],
    tags: ["Global Leadership", "Public Speaking", "Problem Solving"],
  },
  {
    id: 2,
    category: "Module 2",
    tag: "Core",
    title: "Public Speaking and Debate Workshop",
    description:
      "Master the art of persuasion through rhetoric, body language, and argument structure.",
    tasks: [
      "Ethos, Pathos, Logos",
      "Impromptu Speaking",
      "Debate Structures",
      "5-Minute Persuasive Speech",
    ],
    tags: ["Rhetoric", "Debate", "Confidence"],
  },
];

const features: Feature[] = [
  {
    icon: <Trophy className="w-8 h-8 text-amber-600" />,
    title: "Admissions Experts",
    description: "Insights from former Ivy League admissions officers.",
  },
  {
    icon: <Users className="w-8 h-8 text-amber-600" />,
    title: "Verified Alumni",
    description: "Mentorship from successful alumni worldwide.",
  },
  {
    icon: <FileText className="w-8 h-8 text-amber-600" />,
    title: "Application Support",
    description: "Essay & CV reviews with expert feedback.",
  },
  {
    icon: <Globe className="w-8 h-8 text-amber-600" />,
    title: "Global Network",
    description: "Connect with ambitious students globally.",
  },
];

const faqs: FAQ[] = [
  {
    question: "How do I apply?",
    answer: "Applications are open online.",
  },
  {
    question: "Is financial aid available?",
    answer: "Yes, merit-based scholarships are offered.",
  },
];

/* =======================
   COMPONENTS
======================= */

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
    <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const ModuleCard = ({
  module,
  isLast,
}: {
  module: Module;
  isLast: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex relative">
      <div className="mr-6 flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border ${isOpen ? "bg-amber-500" : "bg-white"
            }`}
        >
          <Star className="w-5 h-5 text-white" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-slate-300 my-2" />}
      </div>

      <div className="pb-16 flex-1">
        <h3 className="text-xl font-bold mb-2">{module.title}</h3>

        <button
          onClick={() => setIsOpen((p) => !p)}
          className="text-amber-600 font-bold flex items-center gap-2"
        >
          {isOpen ? "Close Curriculum" : "View Curriculum"}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isOpen && (
          <div className="mt-4 bg-white border p-6 rounded-xl">
            <p className="mb-4 text-slate-600">{module.description}</p>

            {module.tasks.map((task, i) => (
              <div key={i} className="flex gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {task}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="p-6 border rounded-2xl bg-white">
    <div className="mb-4">{feature.icon}</div>
    <h3 className="font-bold text-lg">{feature.title}</h3>
    <p className="text-slate-600 text-sm">{feature.description}</p>
  </div>
);

const FAQItem = ({ item }: { item: FAQ }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex justify-between font-semibold"
      >
        {item.question}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && <p className="mt-2 text-slate-600">{item.answer}</p>}
    </div>
  );
};

/* =======================
   MAIN PAGE
======================= */

const AmbitionClubLanding = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <SectionHeader
        title="World-Class Curriculum"
        subtitle="Built by experts and alumni"
      />

      {modules.map((m, i) => (
        <ModuleCard key={m.id} module={m} isLast={i === modules.length - 1} />
      ))}

      <div className="grid md:grid-cols-4 gap-6 my-20">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <FAQItem key={i} item={faq} />
        ))}
      </div>

      <div className="text-center mt-20">
        <button className="px-8 py-3 bg-black text-white rounded-full flex items-center gap-2 mx-auto">
          Reserve a Seat <Target />
        </button>
      </div>
    </div>
  );
};

export default AmbitionClubLanding;
