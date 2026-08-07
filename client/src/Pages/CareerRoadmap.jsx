import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Briefcase,
  GraduationCap,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";

import {
  generateCareerRoadmap,
  getMyCareerRoadmap,
} from "../services/careerRoadmapService";

import toast from "react-hot-toast";

function CareerRoadmap() {
  const [career, setCareer] = useState("AI Engineer");
  const [level, setLevel] = useState("Beginner");
  const [studyHours, setStudyHours] = useState(2);

  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const data = await getMyCareerRoadmap();

      if (data.roadmap) {
        setRoadmap(data.roadmap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const data = await generateCareerRoadmap({
        career,
        level,
        studyHours,
      });

      setRoadmap(data.roadmap);

      toast.success("Pixi created your roadmap!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to generate roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-7xl space-y-10">

        {/* Hero */}

        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">

          <p className="flex items-center gap-2 text-cyan-300">
            <Sparkles size={18}/>
            Pixi AI Career Planner
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Generate Your Career Roadmap
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Tell Pixi your dream career and receive
            a personalized learning roadmap designed
            to guide you step by step.
          </p>

        </section>

        {/* Generator */}

        <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-8 backdrop-blur-xl">

          <div className="grid gap-6 md:grid-cols-3">

            <div>

              <label className="mb-2 flex items-center gap-2">

                <Briefcase size={18}/>

                Career

              </label>

              <select
                value={career}
                onChange={(e)=>setCareer(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
              >

                <option>AI Engineer</option>

                <option>Full Stack Developer</option>

                <option>Cybersecurity Engineer</option>

                <option>Data Scientist</option>

                <option>Cloud Engineer</option>

              </select>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2">

                <GraduationCap size={18}/>

                Current Level

              </label>

              <select
                value={level}
                onChange={(e)=>setLevel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
              >

                <option>Beginner</option>

                <option>Intermediate</option>

                <option>Advanced</option>

              </select>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2">

                <Clock size={18}/>

                Study Hours / Day

              </label>

              <select
                value={studyHours}
                onChange={(e)=>setStudyHours(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
              >

                <option value={1}>1 Hour</option>

                <option value={2}>2 Hours</option>

                <option value={3}>3 Hours</option>

                <option value={4}>4 Hours</option>

                <option value={5}>5 Hours</option>

              </select>

            </div>

          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 flex items-center gap-3 rounded-full bg-cyan-500 px-8 py-4 font-bold text-slate-950 hover:bg-cyan-300"
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20}/>
                Generate with Pixi AI
              </>
            )}

          </button>

        </section>
                {/* Generated Roadmap */}

        {roadmap && (

          <section className="space-y-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-4xl font-black">
                  Your AI Career Roadmap 🚀
                </h2>

                <p className="mt-2 text-slate-400">
                  Career: <span className="font-semibold text-cyan-300">
                    {roadmap.career}
                  </span>
                </p>

              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-3">

                <p className="text-sm text-slate-400">
                  Current Level
                </p>

                <h3 className="text-xl font-bold">
                  {roadmap.level}
                </h3>

              </div>

            </div>

            <div className="grid gap-8">

              {roadmap.roadmap.map((month) => (

                <div
                  key={month.month}
                  className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-8 backdrop-blur-xl transition hover:border-cyan-400/40"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>

                      <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">

                        Month {month.month}

                      </span>

                      <h3 className="mt-4 text-3xl font-bold">

                        {month.title}

                      </h3>

                    </div>

                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">

                    {month.topics.map((topic, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                      >

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-slate-950 font-bold">

                          ✓

                        </div>

                        <span className="font-medium">

                          {topic}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}
              </div>

    </DashboardLayout>

  );
}

export default CareerRoadmap;