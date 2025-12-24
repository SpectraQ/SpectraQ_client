import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Lock,
  Activity,
  AlertCircle,
  CheckCircle2,
  Timer,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.jpg";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";

// --- Left Panel: System Status (Reused) ---
const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/10 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quantum-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top: Navigation */}
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
          onClick={() => nav("/login")}
        >
          <ArrowLeft size={14} />
          Abort Verification
        </div>
      </div>

      {/* Middle: Brand Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
          <img
            src={logo}
            alt="SpectraQ Logo"
            className="w-10 h-10 object-contain opacity-90"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-quantum-red tracking-tight mb-4">
          2FA Gateway
        </h1>

        <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
          Establishing secure handshake protocol.
        </p>
      </div>

      {/* Bottom: Mock System Stats */}
      <div className="relative z-10">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-2">
            <span>CONNECTION</span>
            <span className="text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
              ENCRYPTED
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>PROTOCOL</span>
            <span className="text-white">OTP-SHA256</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Right Panel: Verification Form ---
const VerifyEmailForm = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Timer State
  const [timer, setTimer] = useState(45); // Start with 45s cooldown

  const {
    verifyUser,
    resendOtpToEmail,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  const emailFromState = (location.state as any)?.email as string | undefined;
  const [email] = useState<string | null>(
    () => emailFromState ?? localStorage.getItem("email") ?? null
  );

  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  // Handle Errors
  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  // Handle Messages
  useEffect(() => {
    if (message) setSuccessMsg(message);
  }, [message]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last character entered to ensure single digit per box
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current is empty, move back and delete previous
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  // --- PASTE FUNCTIONALITY ---
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if it's numeric
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    // Focus the box after the last pasted digit
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    setLocalError(null);
    setSuccessMsg(null);
    const code = otp.join("");

    if (code.length !== 6) {
      setLocalError("INPUT_ERROR: 6 digits required");
      return;
    }

    if (!email) {
      setLocalError("SESSION_ERROR: Email context missing");
      return;
    }

    setSubmitting(true);
    try {
      const action = await verifyUser({ email, otp: parseInt(code, 10) });
      setSuccessMsg(
        (action as any).payload?.message ||
          "VERIFIED: Redirecting to dashboard..."
      );
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setLocalError(
        typeof err === "string" ? err : err?.message || "Verification failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return; // Prevent spam

    setLocalError(null);
    setSuccessMsg(null);

    if (!email) {
      setLocalError("SESSION_ERROR: Email context missing");
      return;
    }

    setResending(true);
    try {
      await resendOtpToEmail({ email });
      setSuccessMsg("SYSTEM: New OTP transmitted");
      setTimer(45); // Reset timer
    } catch (err: any) {
      setLocalError(err?.toString?.() || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] relative px-6">
      {/* Mobile Background decoration */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] -z-10" />

      <div className="mx-auto w-full max-w-[450px] space-y-8">
        {/* Mobile Logo */}
        <div className="flex flex-col items-center lg:hidden mb-8">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <img src={logo} alt="SpectraQ" className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            SpectraQ Terminal
          </h1>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Verify Identity
            </h1>
            <Badge
              variant="outline"
              className="border-blue-500/20 bg-blue-500/10 text-blue-500 text-[10px] font-mono px-2 py-0.5"
            >
              <Lock className="w-3 h-3 mr-1" /> AWAITING_INPUT
            </Badge>
          </div>
          <p className="text-gray-400 text-sm text-left font-mono">
            Enter the 6-digit code sent to{" "}
            <span className="text-white">
              {email
                ? `${email.substring(0, 3)}...${email.split("@")[1]}`
                : "your email"}
            </span>
          </p>
        </div>

        <div className="space-y-8">
          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-white bg-[#0A0A0A] border-white/10 text-xl font-mono focus-visible:ring-1 focus-visible:ring-quantum-red focus-visible:border-quantum-red transition-all shadow-inner"
              />
            ))}
          </div>

          {/* Logs / Feedback Area */}
          {(localError || successMsg) && (
            <div
              className={`p-3 rounded border text-xs font-mono flex items-start gap-2 ${
                localError
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-green-500/10 border-green-500/20 text-green-400"
              }`}
            >
              {localError ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span className="mt-0.5">{localError || successMsg}</span>
            </div>
          )}

          <Button
            onClick={handleVerify}
            className="w-full h-11 bg-quantum-red text-white hover:bg-red-700 font-medium text-sm transition-all rounded-md"
            disabled={submitting || loading}
          >
            {submitting || loading ? (
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" /> Verifying Hash...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Confirm Identity
              </span>
            )}
          </Button>

          {/* Resend / Timer Section */}
          <div className="text-center pt-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              {timer > 0 ? (
                <span className="text-xs text-gray-500 font-mono flex items-center gap-2">
                  <Timer className="w-3 h-3" />
                  Resend locked for {timer}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resending || loading}
                  className="text-xs font-mono text-quantum-red hover:textred-700 transition-colors flex items-center gap-2 uppercase tracking-wide"
                >
                  {resending ? (
                    <Activity className="w-3 h-3 animate-spin" />
                  ) : (
                    <Smartphone className="w-3 h-3" />
                  )}
                  Resend Code
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500 font-mono mb-4">- OR -</div>
            <p className="text-sm text-gray-400">
              Wrong email address?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-quantum-red hover:underline decoration-white/30 underline-offset-4 cursor-pointer"
              >
                Restart Registration
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground relative">
      <BrandingPanel />
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;
