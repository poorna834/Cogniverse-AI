import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  askAI,
  getChatHistory,
  clearChatHistory,
} from "../services/aiService";
import {
  Send,
  Trash2,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

function AIMentor() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const data = await getChatHistory();

      const history = [];

      data.chats.forEach((chat) => {
        history.push({
          type: "user",
          text: chat.question,
        });

        history.push({
          type: "ai",
          text: chat.answer,
          category: chat.category,
        });
      });

      setMessages(history);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const data = await askAI(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.reply.answer,
          category: data.reply.category,
        },
      ]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await clearChatHistory();

      setMessages([]);

      toast.success("Chat history cleared");
    } catch (error) {
      toast.error("Unable to clear history");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Hero */}

        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl shadow-[0_0_45px_rgba(34,211,238,0.18)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-cyan-300 flex items-center gap-2">
                <Sparkles size={18}/>
                Cogniverse Pixi AI
              </p>

              <h1 className="mt-2 text-5xl font-black">
                Your Personal AI Mentor
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Ask anything about programming,
                AI, careers, interview preparation,
                roadmaps, projects or higher studies.
              </p>

            </div>

            <button
              onClick={handleClear}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-5 py-3 hover:bg-red-500/20"
            >
              <Trash2 size={18}/>
            </button>

          </div>

        </section>
                {/* Chat Window */}

        <section className="rounded-[2rem] border border-purple-400/20 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <div className="h-[520px] overflow-y-auto p-8 space-y-6">

            {messages.length === 0 && (

              <div className="flex h-full flex-col items-center justify-center text-center">

                <Bot
                  size={70}
                  className="text-cyan-300"
                />

                <h2 className="mt-6 text-3xl font-bold">
                  Welcome to Pixi AI
                </h2>

                <p className="mt-4 max-w-lg text-slate-400">
                  Ask me anything about coding,
                  AI, Data Science, career guidance,
                  interview preparation or learning
                  roadmaps.
                </p>

              </div>

            )}

            {messages.map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.type === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] rounded-3xl p-5 ${
                    message.type === "user"
                      ? "bg-cyan-500 text-slate-950"
                      : "border border-purple-400/20 bg-black/30"
                  }`}
                >

                  <div className="mb-3 flex items-center gap-2">

                    {message.type === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot
                        size={18}
                        className="text-cyan-300"
                      />
                    )}

                    <span className="font-semibold">

                      {message.type === "user"
                        ? "You"
                        : "Pixi AI"}

                    </span>

                  </div>

                  <p className="leading-7 whitespace-pre-wrap">

                    {message.text}

                  </p>

                  {message.category && (

                    <div className="mt-4">

                      <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">

                        {message.category}

                      </span>

                    </div>

                  )}

                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="rounded-3xl border border-cyan-400/20 bg-black/30 p-5">

                  <div className="flex items-center gap-3">

                    <Loader2
                      size={20}
                      className="animate-spin text-cyan-300"
                    />

                    <span>
                      Pixi is thinking...
                    </span>

                  </div>

                </div>

              </div>

            )}

            <div ref={bottomRef}></div>

          </div>
                  {/* Input Area */}

        <div className="border-t border-white/10 p-6">

          <div className="flex flex-col gap-4 md:flex-row">

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();

                  handleAsk();
                }
              }}
              rows={2}
              placeholder="Ask Pixi anything... (Press Enter to send)"
              className="flex-1 resize-none rounded-2xl border border-cyan-400/20 bg-black/20 p-4 outline-none transition focus:border-cyan-400"
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send
                </>
              )}
            </button>

          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            Pixi AI is continuously learning. Future versions will support
            personalized mentoring, interview coaching, roadmap generation,
            quizzes, and real-time AI assistance.
          </p>

        </div>

      </section>

    </div>

  </DashboardLayout>

  );
}

export default AIMentor;