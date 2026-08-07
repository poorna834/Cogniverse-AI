import { motion } from "framer-motion";
import { Clock, Star, Users } from "lucide-react";

function FeaturedCourses() {
  const courses = [
    {
      title: "Complete MERN Stack Bootcamp",
      category: "Web Development",
      level: "Beginner",
      duration: "40 Hours",
      students: "120K+",
      rating: "4.9",
    },
    {
      title: "Python for AI Beginners",
      category: "AI & Machine Learning",
      level: "Beginner",
      duration: "25 Hours",
      students: "95K+",
      rating: "4.8",
    },
    {
      title: "SQL for Data Analytics",
      category: "Data Science",
      level: "Beginner",
      duration: "12 Hours",
      students: "80K+",
      rating: "4.7",
    },
  ];

  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-black">Featured Free Courses</h2>
        <p className="mt-4 text-center text-slate-400">
          Curated resources to help students build job-ready skills.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10"
            >
              <div className="h-44 bg-gradient-to-br from-indigo-500/40 via-cyan-400/20 to-purple-500/30" />

              <div className="p-7">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                  {course.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold">{course.title}</h3>

                <p className="mt-3 text-slate-400">{course.level}</p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} /> {course.rating}
                  </span>
                </div>

                <button className="mt-7 w-full rounded-full bg-indigo-500 py-3 font-semibold hover:bg-indigo-400">
                  Start Learning
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;