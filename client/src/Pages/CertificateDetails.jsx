import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getCertificateById } from "../services/certificateService";

function CertificateDetails() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificate();
  }, []);

  const loadCertificate = async () => {
    try {
      const data = await getCertificateById(id);
      setCertificate(data.certificate);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-xl">
          Loading Certificate...
        </div>
      </DashboardLayout>
    );
  }

  if (!certificate) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          Certificate not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 via-white/5 to-cyan-500/10 p-12 shadow-xl">

          <div className="text-center">

            <h1 className="text-5xl font-black text-yellow-300">
              🏆 Certificate of Completion
            </h1>

            <p className="mt-3 text-slate-300">
              Cogniverse AI Learning Platform
            </p>

          </div>

          <div className="mt-16 space-y-8 text-center">

            <p className="text-xl">
              This Certificate is Proudly Presented To
            </p>

            <h2 className="text-5xl font-black text-cyan-300">
              {certificate.user?.name || "Student"}
            </h2>

            <p className="text-xl">
              for successfully completing the course
            </p>

            <h3 className="text-4xl font-bold">
              {certificate.course?.title}
            </h3>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 text-center">

            <div>
              <p className="text-slate-400">Certificate ID</p>

              <h3 className="mt-2 font-mono text-cyan-300 break-all">
                {certificate.certificateId}
              </h3>
            </div>

            <div>
              <p className="text-slate-400">Issued On</p>

              <h3 className="mt-2">
                {new Date(certificate.issuedAt).toLocaleDateString()}
              </h3>
            </div>

            <div>
              <p className="text-slate-400">Platform</p>

              <h3 className="mt-2">
                Cogniverse AI
              </h3>
            </div>

          </div>

          <div className="mt-16 flex justify-center gap-5">

            <button
              onClick={() => window.print()}
              className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Print Certificate
            </button>

            <Link
              to="/certificates"
              className="rounded-full border border-white/20 px-6 py-3 hover:bg-white/10"
            >
              Back
            </Link>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default CertificateDetails;