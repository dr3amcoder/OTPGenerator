const { useState, useEffect, useRef } = React;

const AppDetails = () => {
    return (
        <div className="container">
            <h1 id="app-title">dr3amcoder's mini apps</h1>
            <p id="app-description">
                A growing collection of React mini-apps built during my continuous learning journey.
                <br/>
                Each project focuses on practicing specific React concepts and patterns through hands-on development.
            </p>
        </div>
    )
}

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
            {otp !== "" && <p id="otp-timer" aria-live="polite">{isCountingDown ? `Expires in: ${secondsLeft} seconds` : "OTP expired. Click the button to generate a new OTP."}</p>}
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

const CharacterCounter = () => {
    const [text, setText] = useState("");
    const length = text.length;

    return (
        <div className="container">
            <h2 id="character-counter-title">Character Counter</h2>
            <input
                id="counter-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />
            {length > 20 && <div className="warning">Too long!</div>}
            <p id="counter-display">You have typed {length} characters.</p>
        </div>
    )
};

const SuperheroForm = () => {

  const powerSourceOptions = [
    'Bitten by a strange creature',
    'Radioactive exposure',
    'Science experiment',
    'Alien heritage',
    'Ancient artifact discovery',
    'Other'
  ];

  const powersOptions = [
    'Super Strength',
    'Super Speed',
    'Flight',
    'Invisibility',
    'Telekinesis',
    'Other'
  ];

  const [heroName, setHeroName] = useState('');
  const [realName, setRealName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [powers, setPowers] = useState([]);

  const handlePowersChange = e => {
    const { value, checked } = e.target;
    setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
  }

  return (
    <div className='container'>
      <h2 id="superhero-application-form-title">Superhero Application Form</h2>
      <p>Please complete all fields</p>
       <form method='post' action='https://superhero-application-form.freecodecamp.org'>
        <div className='section'>
          <label>
            Hero Name
            <input
              type='text'
              value={heroName}
              onChange={e => setHeroName(e.target.value)}
            />
          </label>
          <label>
            Real Name
            <input
              type='password'
              value={realName}
              onChange={e => setRealName(e.target.value)}
            />
          </label>
        </div>
        <label className='section column'>
          How did you get your powers?
          <select value={powerSource} onChange={e => setPowerSource(e.target.value)}>
            <option value=''>
              Select one
            </option>
           {powerSourceOptions.map(source => (
             <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
        <label className='section column'>
          List your powers (select all that apply):

          {powersOptions.map(power => (
            <label key={power}>
              <input
                type='checkbox'
                value={power}
                checked={powers.includes(power)}
                onChange={handlePowersChange}
              />
              <span>{power}</span>
            </label>
          ))}
        </label>
        <button
          className='submit-btn'
          type='submit'
          
        >
          Join the League
        </button>
      </form>
    </div>
  )
};


const EventRSVPForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [dietaryPreferences, setDietaryPreferences] = useState("")
  const [isBringingPlusOne, setIsBringingPlusOne] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const newSubmittedData = {
      name,
      email,
      number,
      dietaryPreferences,
      isBringingPlusOne
    }

    setFormSubmitted(newSubmittedData)

  }


  return(
    <div className="container">
        <h2 id="event-rsvp-title">Event RSVP</h2>
        <form onSubmit={handleSubmit}>
            <div className="event-form-details">
                <label>
                Name: 
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </label>
                <br />
                <label>
                Email: 
                <input
                    type="email"
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </label>
                <br />
                <label>
                Number of attendees: 
                <input
                    type="number"
                    required 
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                />
                </label>
                <br />
                <label>
                Dietary preferences: 
                <input
                    type="text"
                    value={dietaryPreferences}
                    onChange={e => setDietaryPreferences(e.target.value)}
                />
                </label>
                <br />
                <label>
                Bringing additional guests?
                <input
                    type="checkbox"
                    checked={isBringingPlusOne}
                    onChange={e => setIsBringingPlusOne(e.target.checked)} 
                />
                </label>
                <br />
            </div>
            <button
                className='submit-btn'
                type="submit"
            >
                Submit RSVP
            </button>
        </form>
        {Object.keys(formSubmitted).length > 0 && (
            <div className="rsvp-details">
            <h3 id="event-rsvp-confirmation">RSVP Submitted!</h3>
            <p>Name: {formSubmitted.name}</p>
            <p>Email: {formSubmitted.email}</p>
            <p>Number of attendees: {formSubmitted.number}</p>
            <p>Dietary preferences: {formSubmitted.dietaryPreferences}</p>
            <p>Bringing additional guests: {formSubmitted.isBringingPlusOne ? "Yes" : "No"}</p>
            </div>
        )}
    </div>
  )
}

const App = () => {
    return (
        <div className="app-wrapper">
            <AppDetails />
            <OTPGenerator />
            <CharacterCounter />
            <SuperheroForm />
            <EventRSVPForm />
        </div>
    )
};