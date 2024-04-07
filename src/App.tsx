import Forecast from "./components/Forecast.tsx"
import Search from "./components/Search.tsx"
import useForecast from "./hooks/useForecast.ts"

export default function App(): JSX.Element {
  const {
    term, options, forecast, onInputChange, onOptionSelect, onSubmit
  } = useForecast()

  return (
    <>
      <main className={`flex overflow-y-auto justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100dvh] w-full ${forecast && "pt-12" }`}>
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </>
  )
}