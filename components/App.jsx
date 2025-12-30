import AppDetails from "./components/AppDetails";
import OTPGenerator from "./components/OTPGenerator";
import CharacterCounter from "./components/CharacterCounter";
import SuperheroForm from "./components/SuperheroForm";
import EventRSVPForm from "./components/EventRSVPForm";
import ShoppingList from "./components/ShoppingList";

const App = () => {
  return (
    <div className="app-wrapper">
      <AppDetails />
      <OTPGenerator />
      <CharacterCounter />
      <SuperheroForm />
      <EventRSVPForm />
      <ShoppingList />
    </div>
  );
};

export default App;
