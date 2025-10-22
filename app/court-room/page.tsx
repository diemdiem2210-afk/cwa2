"use client";
import React, { useEffect, useState, useRef } from "react";

// Important Tasks 
const importantTasks = [
  {
    id: "t1",
    message: "Change alt in img1 to img2",
    source: "Agile",
    priority: "normal",
    codeSnippet: `const image = document.getElementById('img1');`,
    correctFix: `const image = document.getElementById('img2');`,
    repeatAfter: 120,
    consequence: "Disability Act",
    status: "pending",
  },
  {
    id: "t2",
    message: "Fix input validation",
    source: "System",
    priority: "normal",
    codeSnippet: `if(userInput = '') { alert('Error'); }`,
    correctFix: `if(userInput === '') { alert('Error'); }`,
    repeatAfter: 120,
    consequence: "Laws of Tort",
    status: "pending",
  },
  {
    id: "t3",
    message: "Fix User login",
    source: "Boss",
    priority: "critical",
    codeSnippet: `login(user.password);`,
    correctFix: `login(username,password);`,
    consequence: "Bankruptcy",
    status: "pending",
  },
  {
    id: "t4",
    message: "Fix Secure Database",
    source: "System",
    priority: "critical",
    codeSnippet: `clientdb('myDatabase')`,
    correctFix: `client.db('myDatabase');`,
    consequence: "Hacked → Laws of Tort",
    status: "pending",
  },
];

// Unimportant Tasks
const unimportantTasks = [
  {
    id: "u1",
    message: "Are you done with sprint 1?",
    source: "Boss",
    type: "reply",
    yesReply: "Great! Send me the report via email.",
    noReply: "Hurry up!",
  },
  {
    id: "u2",
    message: "Can you pick up the kids after work?",
    source: "Family",
    type: "reply",
    yesReply: "Okay, count on you.",
    noReply: "Too busy to take care of family!",
  },
];

export default function CourtRoom() {
  const [entered, setEntered] = useState(false);
  const [time, setTime] = useState(0);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [taskInProgress, setTaskInProgress] = useState<any>(null);
  const [courtroomMessage, setCourtroomMessage] = useState<any>(null);
  const [messageCountdown, setMessageCountdown] = useState<number>(15);
  const [phoneReply, setPhoneReply] = useState<string | null>(null);
  const [laptopLogs, setLaptopLogs] = useState<string[]>([]);

  const lastTaskSecondRef = useRef(0);

  // Timer 
  useEffect(() => {
    if (!entered) return;
    const t = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(t);
  }, [entered]);

  // Simulate Tablet Work Logs ---
  useEffect(() => {
    if (!entered) return;
    const logs = [
      "Compiling modules...",
      "Fetching data from server...",
      "Saving user preferences...",
      "Running unit tests...",
      "Checking code linting...",
      "Synchronizing database...",
      "Optimizing images...",
      "Deploying to staging...",
    ];
    const interval = setInterval(() => {
      setLaptopLogs((prev) => {
        const next = [...prev, logs[Math.floor(Math.random() * logs.length)]];
        if (next.length > 8) next.shift(); 
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [entered]);

  // Task Scheduler
  useEffect(() => {
    if (!entered || courtroomMessage || taskInProgress || activeTask) return;

    if (time > 0 && (time % 20 === 0 || time % 25 === 0 || time % 30 === 0) && lastTaskSecondRef.current !== time) {
      const rand = Math.random();
      let task;
      if (rand < 0.6) {
        const pending = importantTasks.filter((t) => t.status === "pending");
        if (pending.length === 0) return;
        task = { ...pending[Math.floor(Math.random() * pending.length)], timer: 15 };
      } else {
        task = { ...unimportantTasks[Math.floor(Math.random() * unimportantTasks.length)], timer: 15 };
      }
      setActiveTask(task);
      setMessageCountdown(15);
      lastTaskSecondRef.current = time;
    }
  }, [time, activeTask, courtroomMessage, taskInProgress]);

  // Countdown for active message
  useEffect(() => {
    if (!activeTask) return;
    const interval = setInterval(() => {
      setMessageCountdown((prev) => {
        if (prev <= 1) {
          handleTaskTimeout(activeTask);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTask]);

  const handleTaskTimeout = (task: any) => {
    if (task.type === "reply") {
      setActiveTask(null);
    } else if (importantTasks.find((t) => t.id === task.id)) {
      handleImportantTaskFailure(task);
    } else {
      setActiveTask(null);
    }
  };

  const handleImportantTaskFailure = (task: any) => {
    if (task.id === "t3" || task.id === "t4") {
      setCourtroomMessage({
        title: task.id === "t3" ? "You declared bankruptcy" : "You got fined $100 for breaking the Laws of Tort.",
        reason: task.id === "t3" ? "No one can use your app and you don't get paid." : "Reason: You knew you got hacked but didn't fix the problem",
      });
    } else if (task.id === "t1") {
      setCourtroomMessage({ title: "You got fined $50 for breaking the Disability Act.", reason: "" });
    } else if (task.id === "t2") {
      setCourtroomMessage({
        title: "You got fined $100 for breaking the Laws of Tort.",
        reason: "Reason: You knew you got hacked but didn't fix the problem",
      });
    }
    setActiveTask(null);
  };

  const handleTaskResponse = (accepted: boolean) => {
    if (!activeTask) return;

    if (activeTask.type === "reply") {
      const msg = accepted ? activeTask.yesReply : activeTask.noReply;
      setPhoneReply(msg);
      setTimeout(() => setPhoneReply(null), 4000);
      setActiveTask(null);
      return;
    }

    if (importantTasks.find((t) => t.id === activeTask.id)) {
      if (!accepted) {
        handleImportantTaskFailure(activeTask);
      } else {
        setTaskInProgress(activeTask);
      }
      setActiveTask(null);
      return;
    }

    if (activeTask.type === "code") {
      if (accepted) setTaskInProgress(activeTask);
      else setActiveTask(null);
    }
  };

  const handleTaskFix = () => {
    if (!taskInProgress) return;
    if (taskInProgress.type === "code" || importantTasks.find((t) => t.id === taskInProgress.id)) {
      if (taskInProgress.userInput?.trim() === taskInProgress.correctFix) {
        setPhoneReply("✅ Task completed!");
        setTimeout(() => setPhoneReply(null), 3000);

        const impIndex = importantTasks.findIndex((t) => t.id === taskInProgress.id);
        if (impIndex !== -1) importantTasks[impIndex].status = "done";

        setTaskInProgress(null);
      } else {
        setTaskInProgress((prev: any) => ({ ...prev, error: "❌ Incorrect fix! Try again." }));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  if (!entered) {
    return (
      <div style={introStyle}>
        <h1>⚖️ Welcome to the Court Room ⚖️</h1>
        <button onClick={() => setEntered(true)} style={buttonStyle}>
          Enter Court Room
        </button>
      </div>
    );
  }

  if (courtroomMessage) {
    return (
      <div style={{ ...courtroomOverlayStyle, backgroundImage: `url(/courtroom.png)`, backgroundSize: "cover" }}>
        <div style={courtroomBoxStyle}>
          <h2>{courtroomMessage.title}</h2>
          {courtroomMessage.reason && <p>{courtroomMessage.reason}</p>}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
            <button
              style={buttonStyle}
              onClick={() => {
                setCourtroomMessage(null);
                setTime(0);
                setActiveTask(null);
                setTaskInProgress(null);
                setEntered(false);
              }}
            >
              End Game
            </button>
            <button style={buttonStyle} onClick={() => setCourtroomMessage(null)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={mainSceneStyle}>
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: "50px",
          backgroundColor: "#cbbf9f",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              <div style={laptopStyle}>
                <div style={laptopScreenStyle}>
                  {laptopLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              </div>
            </td>
            <td style={{ textAlign: "center" }}>
              <div style={phoneStyle}>
                <div style={phoneScreenStyle}>
                  {activeTask && (
                    <>
                      <div style={{ fontSize: "0.9rem", overflowWrap: "break-word" }}>
                        <b>{activeTask.source}</b>: {activeTask.message} ({messageCountdown}s)
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                        <button onClick={() => handleTaskResponse(true)} style={yesButtonStyle}>
                          ✅ Yes
                        </button>
                        <button onClick={() => handleTaskResponse(false)} style={noButtonStyle}>
                          ❌ No
                        </button>
                      </div>
                    </>
                  )}
                  {!activeTask && !taskInProgress && <div>📞 Waiting...</div>}
                  {phoneReply && <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#0f0" }}>{phoneReply}</div>}
                </div>
              </div>
            </td>
            <td style={{ textAlign: "center" }}>
              <div style={clockStyle}>{formatTime(time)}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {taskInProgress && (
        <div style={taskPopupStyle}>
          {taskInProgress.codeSnippet && (
            <>
              <pre style={codeBoxStyle}>{taskInProgress.codeSnippet}</pre>
              <input
                type="text"
                placeholder={taskInProgress.hint || "Type your fix here"}
                value={taskInProgress.userInput || ""}
                onChange={(e) => setTaskInProgress({ ...taskInProgress, userInput: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleTaskFix()}
                style={inputStyle}
                autoFocus
              />
            </>
          )}
          {taskInProgress.error && <div style={{ color: "red", marginTop: "5px" }}>{taskInProgress.error}</div>}
        </div>
      )}
    </div>
  );
}

// Styles
const introStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  background: "linear-gradient(#1a1a1a,#333)",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 28px",
  fontSize: "1.2rem",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#d4af37",
  color: "black",
  cursor: "pointer",
};

const mainSceneStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(#d8cab8,#a48b65)",
};

const laptopStyle: React.CSSProperties = {
  width: "220px",
  height: "160px",
  backgroundColor: "#222",
  borderRadius: "8px",
  border: "3px solid #444",
  padding: "8px",
};

const laptopScreenStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#111",
  color: "#0f0",
  fontFamily: "monospace",
  fontSize: "0.8rem",
  padding: "5px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const phoneStyle: React.CSSProperties = {
  width: "140px",
  height: "200px",
  backgroundColor: "#111",
  border: "2px solid #666",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const phoneScreenStyle: React.CSSProperties = {
  width: "120px",
  height: "180px",
  backgroundColor: "#222",
  borderRadius: "8px",
  color: "#0f0",
  fontSize: "0.9rem",
  fontFamily: "monospace",
  padding: "4px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowWrap: "break-word",
};

const clockStyle: React.CSSProperties = {
  width: "100px",
  height: "40px",
  backgroundColor: "black",
  color: "#0f0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  fontFamily: "monospace",
  fontSize: "1rem",
};

const taskPopupStyle: React.CSSProperties = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#222",
  color: "#0f0",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #0f0",
  textAlign: "center",
  width: "400px",
  zIndex: 100,
};

const codeBoxStyle: React.CSSProperties = {
  background: "#111",
  color: "#0f0",
  padding: "10px",
  borderRadius: "5px",
  textAlign: "left",
};

const inputStyle: React.CSSProperties = {
  marginTop: "10px",
  width: "100%",
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid #888",
  fontFamily: "monospace",
  textAlign: "center",
};

const yesButtonStyle: React.CSSProperties = {
  flex: 1,
  marginRight: "2px",
  backgroundColor: "#0a0",
  color: "white",
  border: "none",
  borderRadius: "3px",
  fontSize: "0.7rem",
  cursor: "pointer",
};

const noButtonStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#a00",
  color: "white",
  border: "none",
  borderRadius: "3px",
  fontSize: "0.7rem",
  cursor: "pointer",
};

const courtroomOverlayStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const courtroomBoxStyle: React.CSSProperties = {
  backgroundColor: "rgba(0,0,0,0.85)",
  color: "white",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  maxWidth: "500px",
};
