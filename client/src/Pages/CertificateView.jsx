import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getMyCertificates } from "../services/certificateService";

function CertificateView() {
  const { id } = useParams();
  const certRef = useRef(null);

  const [certificate, setCertificate] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCertificate = async () => {
      const data = await getMyCertificates();
      const found = data.certificates.find((item) => item._id === id);
      setCertificate(found);
    };

    fetchCertificate();
  }, [id]);

  const downloadCertificate = async () => {
    try {
      setDownloading(true);

      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 297, 210);
      pdf.save(`${certificate.certificateId}.pdf`);
    } catch (error) {
      console.log(error);
      alert("PDF download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (!certificate) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading certificate...</p>
      </DashboardLayout>
    );
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString();
  const verifyUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
  const studentName = user?.name || "Student";
  const courseTitle = certificate.course?.title || "Completed Course";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <button
          onClick={downloadCertificate}
          disabled={downloading}
          className="mb-6 rounded-full bg-cyan-500 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
        >
          {downloading ? "Generating PDF..." : "Download Certificate PDF"}
        </button>

        <div className="overflow-auto rounded-3xl bg-white/5 p-6">
          <div
            ref={certRef}
            style={{
              width: "1123px",
              height: "794px",
              margin: "0 auto",
              background:
                "linear-gradient(135deg,#ffffff 0%,#f8fbff 55%,#f4edff 100%)",
              color: "#0f172a",
              fontFamily: "Arial, sans-serif",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
              padding: "42px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "26px",
                border: "6px solid #d4af37",
                borderRadius: "28px",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: "46px",
                border: "2px solid #22d3ee",
                borderRadius: "20px",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "-90px",
                top: "-80px",
                width: "300px",
                height: "250px",
                background: "linear-gradient(135deg,#06142f,#2563eb)",
                transform: "rotate(-16deg)",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "-90px",
                bottom: "-90px",
                width: "300px",
                height: "260px",
                background: "linear-gradient(135deg,#7c3aed,#06142f)",
                transform: "rotate(-16deg)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "grid",
                gridTemplateRows: "105px 1fr 150px",
                gap: "8px",
              }}
            >
              <header
                style={{
                  display: "grid",
                  gridTemplateColumns: "190px 1fr 190px",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      margin: "0 auto",
                      borderRadius: "20px",
                      background:
                        "linear-gradient(135deg,#22d3ee,#7c3aed,#ec4899)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "42px",
                      fontWeight: "900",
                    }}
                  >
                    C
                  </div>

                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: "18px",
                      fontWeight: "900",
                      letterSpacing: "2px",
                    }}
                  >
                    COGNIVERSE
                  </p>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "54px",
                      letterSpacing: "5px",
                      color: "#10245c",
                      fontWeight: "950",
                      lineHeight: 1,
                    }}
                  >
                    CERTIFICATE
                  </h1>

                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "21px",
                      letterSpacing: "7px",
                      color: "#d4af37",
                      fontWeight: "900",
                    }}
                  >
                    OF COMPLETION
                  </p>
                </div>

                <div
                  style={{
                    width: "106px",
                    height: "106px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,#06142f 44%,#f5c542 45%,#f5c542 64%,#9a6b00 65%)",
                    color: "#f8d66d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontWeight: "900",
                    fontSize: "13px",
                    lineHeight: "1.25",
                  }}
                >
                  VERIFIED
                  <br />
                  AWARD
                </div>
              </header>

              <main
                style={{
                  display: "grid",
                  gridTemplateColumns: "230px 1fr 180px",
                  gap: "28px",
                  minHeight: 0,
                }}
              >
                <aside
                  style={{
                    background: "#06142f",
                    color: "#ffffff",
                    border: "3px solid #22d3ee",
                    borderRadius: "24px",
                    padding: "22px 24px",
                    boxSizing: "border-box",
                    alignSelf: "center",
                  }}
                >
                  {[
                    ["ISSUED ON", issuedDate],
                    ["LEVEL", `Level ${user?.level || 1}`],
                    ["GRADE", "A+"],
                    ["XP EARNED", `${user?.xp || 0} XP`],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      style={{
                        paddingBottom: index !== 3 ? "16px" : 0,
                        marginBottom: index !== 3 ? "16px" : 0,
                        borderBottom:
                          index !== 3
                            ? "1px solid rgba(34,211,238,0.35)"
                            : "none",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "#22d3ee",
                          fontSize: "12px",
                          fontWeight: "900",
                          letterSpacing: "1px",
                        }}
                      >
                        {label}
                      </p>

                      <p
                        style={{
                          margin: "7px 0 0",
                          fontSize: "19px",
                          fontWeight: "800",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </aside>

                <section
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "9px 38px",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg,#06b6d4,#2563eb,#a855f7,#ec4899)",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "900",
                      letterSpacing: "4px",
                    }}
                  >
                    PROUDLY PRESENTED TO
                  </div>

                  <h2
                    style={{
                      margin: "22px 0 0",
                      fontFamily: "Georgia, serif",
                      fontSize: studentName.length > 18 ? "42px" : "52px",
                      color: "#153eaa",
                      lineHeight: "1.08",
                    }}
                  >
                    {studentName}
                  </h2>

                  <div
                    style={{
                      width: "500px",
                      height: "2px",
                      margin: "12px auto 18px",
                      background:
                        "linear-gradient(90deg,transparent,#22d3ee,#7c3aed,transparent)",
                    }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#334155",
                    }}
                  >
                    has successfully completed
                  </p>

                  <h3
                    style={{
                      margin: "14px auto 0",
                      maxWidth: "590px",
                      fontSize: courseTitle.length > 32 ? "28px" : "36px",
                      lineHeight: "1.15",
                      color: "#2563eb",
                      fontWeight: "950",
                    }}
                  >
                    {courseTitle}
                  </h3>

                  <p
                    style={{
                      margin: "14px auto 0",
                      maxWidth: "520px",
                      fontSize: "15px",
                      color: "#475569",
                      lineHeight: "1.4",
                    }}
                  >
                    This certificate recognizes dedication, curiosity, and
                    successful learning achievement in Cogniverse.
                  </p>

                  <div
                    style={{
                      margin: "18px auto 0",
                      width: "310px",
                      background: "#06142f",
                      color: "#ffffff",
                      border: "4px solid #d4af37",
                      borderRadius: "22px",
                      padding: "12px",
                      boxSizing: "border-box",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#22d3ee",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        fontWeight: "900",
                      }}
                    >
                      CERTIFICATE ID
                    </p>

                    <p
                      style={{
                        margin: "6px 0 0",
                        fontFamily: "monospace",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                    >
                      {certificate.certificateId}
                    </p>
                  </div>
                </section>

                <aside
                  style={{
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: "#ffffff",
                      padding: "8px",
                      border: "4px solid #2563eb",
                    }}
                  >
                    <QRCodeCanvas value={verifyUrl} size={94} />
                  </div>

                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: "12px",
                      fontWeight: "900",
                      lineHeight: "1.35",
                    }}
                  >
                    SCAN TO VERIFY
                    <br />
                    THIS CERTIFICATE
                  </p>
                </aside>
              </main>

              <footer
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "end",
                  padding: "0 210px 22px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    Pixi
                  </p>

                  <div
                    style={{
                      width: "180px",
                      height: "2px",
                      background: "#7c3aed",
                      margin: "4px auto 0",
                    }}
                  />

                  <p style={{ margin: "4px 0 0", fontWeight: "900" }}>Pixi</p>

                  <p style={{ margin: 0, fontSize: "12px" }}>
                    AI Learning Companion
                  </p>
                </div>

                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    Cogniverse
                  </p>

                  <div
                    style={{
                      width: "180px",
                      height: "2px",
                      background: "#7c3aed",
                      margin: "4px auto 0",
                    }}
                  />

                  <p style={{ margin: "4px 0 0", fontWeight: "900" }}>
                    Cogniverse Team
                  </p>

                  <p style={{ margin: 0, fontSize: "12px" }}>
                    Learning Platform
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CertificateView;