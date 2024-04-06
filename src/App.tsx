import { ChangeEvent, useEffect, useState } from "react"
import { OptionType } from "./types"
import Search from "./components/Search.tsx"
import 'dotenv'

function App(): JSX.Element {
  const APIKey = import.meta.env.VITE_PRIVATE_KEY
  const [term, setTerm] = useState<string>("")
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<OptionType | null>(null)
  const [forecast, setForecast] = useState<null>(null)

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${APIKey}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value == "") return

    getSearchOptions(value)
  }

  const getForecast = (city: OptionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${APIKey}`
    )
      .then((res) => res.json())
      .then((data) => setForecast(data))
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const onOptionSelect = (option: OptionType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        {forecast ? (
          "We have forecast"
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

export default App
