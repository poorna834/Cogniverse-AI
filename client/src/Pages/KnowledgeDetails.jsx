import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GitBranch,
  HelpCircle,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Tag,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  downloadKnowledge,
  getKnowledgeById,
} from "../services/knowledgeService";

function KnowledgeDetails() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const loadKnowledge = async () => {
      try {
        setLoading(true);

        const data = await getKnowledgeById(id);
        setNote(data?.note || null);
      } catch (error) {
        console.error("Knowledge details error:", error);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    loadKnowledge();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      const progress = (window.scrollY / documentHeight) * 100;

      setReadingProgress(
        Math.min(100, Math.max(0, Math.round(progress)))
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const readingTime = useMemo(() => {
    if (!note?.content) {
      return 1;
    }

    const words = note.content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
  }, [note]);

  const handleDownload = async () => {
    if (!note?.pdf) {
      alert("PDF is not available for this resource.");
      return;
    }

    try {
      setDownloading(true);

      const data = await downloadKnowledge(id);

      setNote((previous) =>
        previous
          ? {
              ...previous,
              downloads:
                data?.downloads !== undefined
                  ? data.downloads
                  : previous.downloads,
            }
          : previous
      );

      window.open(note.pdf, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("PDF download error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to open the PDF resource."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleAnswerSelect = (mcqIndex, option) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [mcqIndex]: option,
    }));
  };

  const handleSubmitAnswer = (mcqIndex) => {
    if (!selectedAnswers[mcqIndex]) {
      alert("Please select an option first.");
      return;
    }

    setSubmittedAnswers((previous) => ({
      ...previous,
      [mcqIndex]: true,
    }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-7xl">
          <KnowledgeDetailsSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (!note) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-center sm:rounded-3xl sm:p-10">
          <div className="text-6xl">📕</div>

          <h1 className="mt-5 text-2xl font-black sm:text-3xl">
            Knowledge resource not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            This learning resource may have been removed or is unavailable.
          </p>

          <Link
            to="/knowledge"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Knowledge Hub
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-black/30">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-200"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      <DashboardLayout>
        <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/knowledge"
              className="inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300 sm:text-base"
            >
              <ArrowLeft size={18} />
              Back to Knowledge Hub
            </Link>

            <div className="w-fit rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 sm:text-sm">
              Reading Progress: {readingProgress}%
            </div>
          </div>

          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 shadow-[0_0_40px_rgba(34,211,238,0.1)] sm:rounded-3xl lg:rounded-[2rem]">
            <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 sm:h-64 lg:h-72">
              {note.coverImage || note.thumbnail ? (
                <img
                  src={note.coverImage || note.thumbnail}
                  alt={note.title || "Knowledge resource"}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen
                    size={88}
                    className="text-cyan-300/70 sm:size-[100px]"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            </div>

            <div className="relative -mt-14 p-5 sm:-mt-20 sm:p-8 lg:-mt-24 lg:p-10">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge className="bg-cyan-500/20 text-cyan-300">
                  {note.category || "General"}
                </Badge>

                <Badge className="bg-purple-500/20 text-purple-300">
                  {note.level || "General"}
                </Badge>

                {note.subject && (
                  <Badge className="bg-pink-500/20 text-pink-300">
                    {note.subject}
                  </Badge>
                )}

                {note.chapter && (
                  <Badge className="bg-white/10 text-slate-300">
                    {note.chapter}
                  </Badge>
                )}

                {note.featured && (
                  <Badge className="bg-yellow-400 font-bold text-slate-950">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl break-words text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-6xl">
                {note.title}
              </h1>

              <p className="mt-4 max-w-3xl break-words text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base lg:text-lg">
                {note.description ||
                  "Explore this Cogniverse learning resource."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300 sm:mt-7 sm:gap-3 sm:text-sm">
                <Meta
                  icon={<Clock size={17} />}
                  text={`${readingTime} min read`}
                />

                <Meta
                  icon={<Eye size={17} />}
                  text={`${note.views || 0} views`}
                />

                <Meta
                  icon={<Download size={17} />}
                  text={`${note.downloads || 0} downloads`}
                />

                <Meta
                  icon={<FileText size={17} />}
                  text={`${note.mcqs?.length || 0} MCQs`}
                />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              {/* Learning Content */}
              <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-10">
                <div className="mb-6 flex items-center gap-3 sm:mb-7">
                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                    <BookOpen className="text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-cyan-300">
                      Study Material
                    </p>

                    <h2 className="text-2xl font-black sm:text-3xl">
                      Learning Content
                    </h2>
                  </div>
                </div>

                <KnowledgeContent content={note.content} />
              </article>

              {/* Important Questions */}
              {note.importantQuestions?.length > 0 && (
                <section className="rounded-2xl border border-cyan-400/20 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-500/10 p-3">
                      <HelpCircle className="text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-cyan-300">
                        Revision
                      </p>

                      <h2 className="text-2xl font-black sm:text-3xl">
                        Important Questions
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {note.importantQuestions.map((item, index) => (
                      <details
                        key={item._id || index}
                        className="group rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-white">
                          <span className="break-words">
                            {index + 1}. {item.question}
                          </span>

                          <ChevronDown
                            size={20}
                            className="shrink-0 text-cyan-300 transition group-open:rotate-180"
                          />
                        </summary>

                        <p className="mt-4 whitespace-pre-wrap break-words border-t border-white/10 pt-4 text-sm leading-7 text-slate-300 sm:text-base">
                          {item.answer || "Answer not added."}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* MCQs */}
              {note.mcqs?.length > 0 && (
                <section className="rounded-2xl border border-pink-400/20 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-pink-500/10 p-3">
                      <FileText className="text-pink-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-pink-300">
                        Test Yourself
                      </p>

                      <h2 className="text-2xl font-black sm:text-3xl">
                        Practice MCQs
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 space-y-5 sm:space-y-6">
                    {note.mcqs.map((mcq, mcqIndex) => {
                      const submitted = submittedAnswers[mcqIndex];
                      const selected = selectedAnswers[mcqIndex];
                      const isCorrect = selected === mcq.answer;

                      return (
                        <div
                          key={mcq._id || mcqIndex}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:rounded-3xl sm:p-6"
                        >
                          <h3 className="break-words text-base font-bold leading-7 sm:text-lg">
                            {mcqIndex + 1}. {mcq.question}
                          </h3>

                          <div className="mt-5 grid gap-3">
                            {(mcq.options || []).map(
                              (option, optionIndex) => {
                                const selectedOption =
                                  selected === option;

                                const showCorrect =
                                  submitted &&
                                  option === mcq.answer;

                                const showIncorrect =
                                  submitted &&
                                  selectedOption &&
                                  option !== mcq.answer;

                                return (
                                  <label
                                    key={`${option}-${optionIndex}`}
                                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                                      showCorrect
                                        ? "border-emerald-400/50 bg-emerald-500/10"
                                        : showIncorrect
                                        ? "border-red-400/50 bg-red-500/10"
                                        : selectedOption
                                        ? "border-cyan-400/50 bg-cyan-500/10"
                                        : "border-white/10 hover:border-cyan-300/30 hover:bg-white/[0.03]"
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <input
                                        type="radio"
                                        name={`mcq-${mcqIndex}`}
                                        checked={selectedOption}
                                        onChange={() =>
                                          handleAnswerSelect(
                                            mcqIndex,
                                            option
                                          )
                                        }
                                        disabled={submitted}
                                        className="mt-1 shrink-0 accent-cyan-400"
                                      />

                                      <span className="min-w-0 break-words text-sm leading-6 sm:text-base">
                                        {option}
                                      </span>

                                      {showCorrect && (
                                        <CheckCircle2
                                          size={19}
                                          className="ml-auto shrink-0 text-emerald-300"
                                        />
                                      )}

                                      {showIncorrect && (
                                        <XCircle
                                          size={19}
                                          className="ml-auto shrink-0 text-red-300"
                                        />
                                      )}
                                    </div>
                                  </label>
                                );
                              }
                            )}
                          </div>

                          {!submitted ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleSubmitAnswer(mcqIndex)
                              }
                              className="mt-5 w-full rounded-full bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-400 sm:w-auto"
                            >
                              Check Answer
                            </button>
                          ) : (
                            <div
                              className={`mt-5 flex items-start gap-3 rounded-2xl p-4 ${
                                isCorrect
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : "bg-red-500/15 text-red-300"
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle2
                                  size={20}
                                  className="mt-0.5 shrink-0"
                                />
                              ) : (
                                <XCircle
                                  size={20}
                                  className="mt-0.5 shrink-0"
                                />
                              )}

                              <div className="min-w-0">
                                <p className="font-semibold">
                                  {isCorrect
                                    ? "Correct answer! 🎉"
                                    : "Incorrect answer"}
                                </p>

                                {!isCorrect && (
                                  <p className="mt-1 break-words text-sm">
                                    Correct answer: {mcq.answer}
                                  </p>
                                )}

                                {mcq.explanation && (
                                  <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                                    {mcq.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="min-w-0 space-y-5 lg:sticky lg:top-6 lg:self-start">
              {/* Learning Resources */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
                <h2 className="text-xl font-black">
                  Learning Resources
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Open the available supporting materials.
                </p>

                <div className="mt-5 space-y-3">
                  {note.pdf && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="flex w-full items-center justify-between rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {downloading ? (
                          <RefreshCw
                            size={18}
                            className="shrink-0 animate-spin"
                          />
                        ) : (
                          <Download size={18} className="shrink-0" />
                        )}

                        <span className="truncate">
                          {downloading
                            ? "Opening..."
                            : "Open PDF"}
                        </span>
                      </span>

                      <ExternalLink size={16} className="shrink-0" />
                    </button>
                  )}

                  {note.video && (
                    <a
                      href={note.video}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-purple-400/30 px-4 py-3 text-purple-300 transition hover:bg-purple-500/10 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <PlayCircle size={18} className="shrink-0" />
                        <span className="truncate">Watch Video</span>
                      </span>

                      <ExternalLink size={16} className="shrink-0" />
                    </a>
                  )}

                  {note.github && (
                    <a
                      href={note.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-slate-300 transition hover:bg-white/10 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <GitBranch size={18} className="shrink-0" />
                        <span className="truncate">
                          Open Resource
                        </span>
                      </span>

                      <ExternalLink size={16} className="shrink-0" />
                    </a>
                  )}

                  {!note.pdf &&
                    !note.video &&
                    !note.github && (
                      <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm leading-6 text-slate-500">
                        No external resources have been added.
                      </p>
                    )}
                </div>
              </section>

              {/* Reading Progress */}
              <section className="rounded-2xl border border-cyan-400/20 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
                <h2 className="text-xl font-black">
                  Reading Progress
                </h2>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200"
                    style={{
                      width: `${readingProgress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    {readingProgress}% completed
                  </span>

                  <span className="font-semibold text-cyan-300">
                    {readingProgress === 100
                      ? "Completed"
                      : "Keep going"}
                  </span>
                </div>
              </section>

              {/* Ask Pixi */}
              <section className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-purple-500/15 p-3">
                    <Sparkles className="text-purple-300" />
                  </div>

                  <h2 className="text-xl font-black">
                    Ask Pixi
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Need a simpler explanation, revision summary, or
                  quiz about this topic?
                </p>

                <Link
                  to="/ai-mentor"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
                >
                  Ask Pixi
                </Link>
              </section>

              {/* Tags */}
              {note.tags?.length > 0 && (
                <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-cyan-300" />
                    <h2 className="font-black">Tags</h2>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="max-w-full break-words rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

function KnowledgeContent({ content }) {
  const sections = useMemo(() => {
    if (!content?.trim()) {
      return [];
    }

    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsedSections = [];

    let currentSection = {
      title: "Overview",
      content: [],
    };

    const isHeading = (line) => {
      const lettersOnly = line.replace(/[^a-zA-Z]/g, "");

      return (
        line.length <= 80 &&
        lettersOnly.length > 2 &&
        line === line.toUpperCase() &&
        !line.startsWith("-") &&
        !line.startsWith("•")
      );
    };

    lines.forEach((line) => {
      if (isHeading(line)) {
        if (
          currentSection.content.length > 0 ||
          currentSection.title !== "Overview"
        ) {
          parsedSections.push(currentSection);
        }

        currentSection = {
          title: line,
          content: [],
        };
      } else {
        currentSection.content.push(line);
      }
    });

    if (
      currentSection.content.length > 0 ||
      parsedSections.length === 0
    ) {
      parsedSections.push(currentSection);
    }

    return parsedSections.filter(
      (section) =>
        section.title.trim() || section.content.length > 0
    );
  }, [content]);

  const [openSections, setOpenSections] = useState([0]);

  useEffect(() => {
    if (sections.length > 0) {
      setOpenSections([0]);
    }
  }, [sections.length]);

  const toggleSection = (index) => {
    setOpenSections((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const expandAll = () => {
    setOpenSections(sections.map((_, index) => index));
  };

  const collapseAll = () => {
    setOpenSections([]);
  };

  if (sections.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/10 p-5 text-slate-400">
        No content has been added yet.
      </p>
    );
  }

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {sections.length} learning{" "}
          {sections.length === 1 ? "section" : "sections"}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={expandAll}
            className="w-full rounded-full border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/10 sm:w-auto"
          >
            Expand All
          </button>

          <button
            type="button"
            onClick={collapseAll}
            className="w-full rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 sm:w-auto"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => {
          const isOpen = openSections.includes(index);

          return (
            <section
              key={`${section.title}-${index}`}
              className={`min-w-0 overflow-hidden rounded-2xl border transition ${
                isOpen
                  ? "border-cyan-400/30 bg-cyan-500/[0.06]"
                  : "border-white/10 bg-black/20"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(index)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-300 sm:h-10 sm:w-10 sm:text-base">
                    {index + 1}
                  </span>

                  <h3 className="min-w-0 break-words text-base font-black text-white sm:text-lg">
                    {formatHeading(section.title)}
                  </h3>
                </div>

                {isOpen ? (
                  <ChevronUp
                    size={20}
                    className="shrink-0 text-cyan-300"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-cyan-300"
                  />
                )}
              </button>

              {isOpen && (
                <div className="min-w-0 border-t border-white/10 px-4 pb-5 pt-5 sm:px-5 sm:pb-6 lg:px-7">
                  <div className="min-w-0 space-y-4">
                    {section.content.map((line, lineIndex) =>
                      renderContentLine(line, lineIndex)
                    )}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function formatHeading(title) {
  return title
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderContentLine(line, index) {
  const isBullet =
    line.startsWith("-") ||
    line.startsWith("•") ||
    line.startsWith("*");

  const isNumbered = /^\d+\./.test(line);

  const looksLikeCode =
    line.includes("System.out") ||
    line.includes("new ArrayList") ||
    line.includes("new HashMap") ||
    line.includes("new HashSet") ||
    line.includes("Iterator<") ||
    line.includes("Collections.") ||
    line.includes("List<") ||
    line.includes("Set<") ||
    line.includes("Map<") ||
    line.includes("const ") ||
    line.includes("let ") ||
    line.includes("function ") ||
    line.includes("public class") ||
    line.includes("public static") ||
    line.endsWith(";") ||
    line === "{" ||
    line === "}";

  if (looksLikeCode) {
    return <CodeLine key={index} line={line} />;
  }

  if (isBullet) {
    return (
      <div
        key={index}
        className="flex min-w-0 items-start gap-3 text-slate-300"
      >
        <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />

        <p className="min-w-0 break-words text-sm leading-7 sm:text-base sm:leading-8">
          {line.replace(/^[-•*]\s*/, "")}
        </p>
      </div>
    );
  }

  if (isNumbered) {
    return (
      <p
        key={index}
        className="break-words text-sm font-semibold leading-7 text-purple-200 sm:text-base sm:leading-8"
      >
        {line}
      </p>
    );
  }

  if (line.toLowerCase() === "example:") {
    return (
      <p
        key={index}
        className="mt-5 text-base font-bold text-cyan-300 sm:text-lg"
      >
        Example
      </p>
    );
  }

  if (line.toLowerCase() === "output:") {
    return (
      <p
        key={index}
        className="mt-5 text-base font-bold text-emerald-300 sm:text-lg"
      >
        Output
      </p>
    );
  }

  return (
    <p
      key={index}
      className="min-w-0 break-words text-sm leading-7 text-slate-300 sm:text-base sm:leading-8"
    >
      {line}
    </p>
  );
}

function CodeLine({ line }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(line);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-purple-400/20 bg-slate-950/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <Copy size={13} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="max-w-full overflow-x-auto p-4 text-xs leading-6 text-cyan-200 sm:text-sm sm:leading-7">
        <code>{line}</code>
      </pre>
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`max-w-full break-words rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function Meta({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/5 bg-black/25 px-3 py-2 sm:px-4">
      <span className="shrink-0 text-cyan-300">{icon}</span>
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}

function KnowledgeDetailsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-5 w-40 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="h-9 w-32 animate-pulse rounded-full bg-white/[0.07]" />
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:rounded-3xl">
        <div className="h-48 animate-pulse bg-white/[0.06] sm:h-64 lg:h-72" />

        <div className="space-y-5 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-white/[0.07]" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-white/[0.07]" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-white/[0.07]" />
          </div>

          <div className="h-10 w-4/5 animate-pulse rounded-xl bg-white/[0.08] sm:h-14" />
          <div className="h-5 w-full animate-pulse rounded-full bg-white/[0.06]" />
          <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />

          <div className="flex flex-wrap gap-3">
            <div className="h-9 w-28 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-9 w-32 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:rounded-3xl sm:p-7">
            <div className="h-8 w-52 animate-pulse rounded-lg bg-white/[0.08]" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 p-5"
                >
                  <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/[0.07]" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-white/[0.05]" />
                  <div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-white/[0.05]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:rounded-3xl"
            >
              <div className="h-6 w-2/3 animate-pulse rounded-full bg-white/[0.08]" />
              <div className="mt-5 h-11 w-full animate-pulse rounded-2xl bg-white/[0.06]" />
              <div className="mt-3 h-11 w-full animate-pulse rounded-2xl bg-white/[0.06]" />
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default KnowledgeDetails;