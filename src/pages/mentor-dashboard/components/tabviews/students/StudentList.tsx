import { StatusBadge, Avatar, ProgressBar } from './UIHelpers';

const StudentList = ({ students, onView }) => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-2xl font-bold text-slate-800">Students List</h3>
        <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition">
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <Th>Student</Th>
                <Th>Email</Th>
                <Th>Course</Th>
                <Th>Progress</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <Avatar name={student.name} />
                    <span className="font-medium text-slate-800">{student.name}</span>
                  </td>
                  <Td>{student.email}</Td>
                  <Td>{student.course}</Td>
                  <Td>
                    <ProgressBar value={student.progress} />
                  </Td>
                  <Td>
                    <StatusBadge status={student.status} />
                  </Td>
                  <Td>
                    <button 
                      onClick={() => onView(student)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      View
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Local table helpers
const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 text-sm text-slate-600">{children}</td>
);

export default StudentList;