const { useState, useEffect, useRef } = React;

const OTPGenerator = () => {
    const [otp, setOtp] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(5)
    const [isCountingDown, setIsCountingDown] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (!isCountingDown) return;

        const countdownTimer = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev < 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsCountingDown(false);
                    return 0;
                }
                return prev - 1;
            })

            if (setSecondsLeft == 0) {
                setIsCountingDown(false)
            }
        }, 1000)

        intervalRef.current = countdownTimer;
        return () => clearInterval(countdownTimer)

    }, [isCountingDown]);


    // otp generator 6 digits
    const generator = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }

        setOtp(Math.floor(100000 + Math.random() * 900000)) // generate 6 digits
        setSecondsLeft(5)
        setIsCountingDown(true) // bool update
    }

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>
            <h2 id="otp-display">{otp ? otp : "Click 'Generate OTP' to get a code"}</h2>
            <p id="otp-timer" aria-live="polite">{isCountingDown ? `Expires in: ${secondsLeft} seconds` : "OTP expired. Click the button to generate a new OTP."}</p>
            <button
                id="generate-otp-button"
                onClick={generator}
                disabled={isCountingDown}
            >
                Generate OTP
            </button>
        </div>
    )
};