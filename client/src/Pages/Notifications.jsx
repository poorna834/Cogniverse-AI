import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Pixi Updates</p>

          <h1 className="mt-2 text-5xl font-black">
            Notifications 🔔
          </h1>

          <p className="mt-3 text-slate-300">
            Your learning updates, achievements, wellness reminders, and Pixi messages appear here.
          </p>
        </section>

        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
            <div className="text-6xl">🔕</div>
            <h2 className="mt-4 text-2xl font-bold">No notifications yet</h2>
            <p className="mt-2 text-slate-400">
              Pixi will notify you when something important happens.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item._id}
                className={`rounded-3xl border p-6 backdrop-blur-xl transition ${
                  item.read
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_35px_rgba(34,211,238,0.15)]"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="text-4xl">{item.icon || "🔔"}</div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-bold">{item.title}</h2>

                      {!item.read && (
                        <span className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-slate-300">{item.message}</p>

                    <p className="mt-3 text-sm text-slate-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {!item.read && (
                      <button
                        onClick={() => handleRead(item._id)}
                        className="mt-4 rounded-full border border-cyan-400/30 px-5 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
                      >
                        Mark as read
                      </button>
                    )}
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

export default Notifications;