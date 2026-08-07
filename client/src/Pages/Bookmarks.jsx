import { useEffect, useState } from "react";
import { Heart, Trash2, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getBookmarks, removeBookmark } from "../services/bookmarkService";
import DashboardLayout from "../layouts/DashboardLayout";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data.bookmarks || []);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (courseId) => {
    await removeBookmark(courseId);
    fetchBookmarks();
  };

  return (
    <DashboardLayout>
      <div>
        <div className="rounded-3xl border border-pink-400/20 bg-white/[0.05] p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(236,72,153,0.14)]">
          <p className="text-pink-300">Your Learning Shelf</p>
          <h1 className="mt-2 text-5xl font-black">Saved Courses</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Courses you bookmarked for later learning.
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <Heart className="mx-auto text-pink-300" size={48} />
            <h2 className="mt-4 text-2xl font-bold">No saved courses yet</h2>
            <p className="mt-2 text-slate-400">
              Go to Courses and save your favorite resources.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {bookmarks.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-3xl border border-pink-400/20 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_35px_rgba(236,72,153,0.12)] transition hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]"
              >
                <div className="relative h-44 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    ❤️
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold">{item.course?.title}</h2>

                  <p className="mt-3 line-clamp-3 text-slate-400">
                    {item.course?.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/courses/${item.course?._id}`}
                      className="flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300"
                    >
                      <PlayCircle size={18} /> Details
                    </Link>

                    <button
                      onClick={() => handleRemove(item.course?._id)}
                      className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-semibold hover:bg-red-400"
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Bookmarks;