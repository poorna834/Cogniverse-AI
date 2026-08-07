import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMyCertificates } from "../services/certificateService";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await getMyCertificates();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Hero */}

        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">
          <h1 className="text-5xl font-black">🏆 My Certificates</h1>

          <p className="mt-3 text-slate-300">
            View all certificates you have earned after completing courses.
          </p>

          <div className="mt-6 flex flex-wrap gap-5">

            <div className="rounded-2xl bg-black/20 p-5">
              <h2 className="text-3xl font-bold text-cyan-300">
                {certificates.length}
              </h2>

              <p className="text-slate-400">
                Certificates Earned
              </p>
            </div>

          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="rounded-3xl bg-white/5 p-10 text-center">
            Loading certificates...
          </div>
        ) : certificates.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

            <div className="text-7xl">📜</div>

            <h2 className="mt-5 text-3xl font-bold">
              No Certificates Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Complete a course to unlock your first certificate.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Browse Courses
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {certificates.map((certificate) => (

              <div
                key={certificate._id}
                className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300"
              >

                <div className="text-6xl text-center">
                  🏆
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  {certificate.course?.title || "Course"}
                </h2>

                <p className="mt-3 text-slate-400">
                  Certificate ID
                </p>

                <p className="font-mono text-cyan-300 break-all">
                  {certificate.certificateId}
                </p>

                <p className="mt-4 text-slate-400">
                  Category
                </p>

                <p>
                  {certificate.course?.category || "General"}
                </p>

                <p className="mt-4 text-slate-400">
                  Issued On
                </p>

                <p>
                  {new Date(
                    certificate.issuedAt
                  ).toLocaleDateString()}
                </p>

                <Link
                  to={`/certificates/${certificate._id}`}
                  className="mt-6 block rounded-xl bg-cyan-500 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  View Certificate
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default Certificates;