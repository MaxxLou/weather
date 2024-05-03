import "dotenv"
import { useState, useEffect, ChangeEvent } from "react"
import { OptionType, ForecastType } from "../types"

export default function useForecast() {
  const APIKey = import.meta.env.VITE_PRIVATE_KEY // or enter your private api key to preview 
  const [term, setTerm] = useState<string>("")
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<OptionType | null>(null)
  const [forecast, setForecast] = useState<ForecastType | null>(null)

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
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${APIKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
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

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}
