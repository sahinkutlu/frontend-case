import MultiSelect from "./components/MultiSelect";
import "./App.css";

function App() {
  return (
    <div className="m-0 p-0 box-border">
      <div className=" flex justify-center h-screen w-screen ">
        <div className="w-[400px] mt-20 mb-10 flex flex-col bg-gray-100 rounded border-2 border-stone-300 px-6 py-4">
          <span className="mb-2 mx-2 font-medium">Kategoriler</span>
          <MultiSelect />
        </div>
      </div>
      <button
        onClick={() =>
          window.open(
            "https://github.com/siddiqss/adcreative-ai-task",
            "_target"
          )
        }
        className="bg-black text-white p-2 rounded-md mt-2 absolute top-0 right-0 m-2"
      >
        Check Github code
      </button>
    </div>
  );
}

export default App;
