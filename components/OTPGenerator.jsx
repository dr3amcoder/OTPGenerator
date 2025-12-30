import { useState } from React;

const OTPGenerator = () => {
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  const generateOTP = () => {
    setOtp(Math.floor(100000 + Math.random() * 900000));
    setSecondsLeft(5);
    setIsCounting(true);
  };

  return (
    <div className="container">
      <h2 className="title-md">OTP Generator</h2>

      <p className="text-muted">
        {otp || "Click below to generate a code"}
      </p>

      {otp && (
        <p className="text-muted">
          {isCounting ? `Expires in ${secondsLeft}s` : "OTP expired"}
        </p>
      )}

      <button className="btn" onClick={generateOTP} disabled={isCounting}>
        Generate OTP
      </button>
    </div>
  );
};


export default OTPGenerator;