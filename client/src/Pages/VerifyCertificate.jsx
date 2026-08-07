import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyCertificate } from "../services/verifyService";

function VerifyCertificate() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await verifyCertificate(id);
        setCertificate(data.certificate);
      } catch {
        setCertificate(null);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );

  if (!certificate)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="rounded-xl bg-red-500/10 p-8 text-center">
          <h1 className="text-3xl font-bold text-red-400">
            Certificate Not Found
          </h1>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-400/30 bg-white/5 p-10">

        <div className="text-center">

          <div className="text-6xl">✅</div>

          <h1 className="mt-4 text-4xl font-black text-cyan-300">
            Certificate Verified
          </h1>

          <p className="mt-2 text-slate-400">
            This certificate was issued by Cogniverse.
          </p>

        </div>

        <div className="mt-10 space-y-6">

          <div>
            <p className="text-slate-400">Student</p>
            <h2 className="text-2xl font-bold">
              {certificate.user.name}
            </h2>
          </div>

          <div>
            <p className="text-slate-400">Course</p>
            <h2 className="text-2xl font-bold">
              {certificate.course.title}
            </h2>
          </div>

          <div>
            <p className="text-slate-400">Certificate ID</p>
            <p className="font-mono text-cyan-300">
              {certificate.certificateId}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Issued On</p>
            <p>
              {new Date(certificate.issuedAt).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyCertificate;