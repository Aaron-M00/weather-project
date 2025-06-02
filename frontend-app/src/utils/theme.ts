export const getWeatherTheme = (weatherMain: string, temp: number) => {
  
    const main = weatherMain.toLowerCase();
  
    if (main.includes("clear") || temp > 77) {
      return {
        background: "from-yellow-300 via-orange-200 to-red-200",
        glow: "bg-yellow-300"
      };
    } else if (main.includes("cloud")) {
      return {
        background: "from-blue-300 via-slate-200 to-sky-100",
        glow: "bg-sky-300"
      };
    } else if (main.includes("snow")) {
      return {
        background: "from-slate-100 via-white to-slate-200",
        glow: "bg-white"
      };
    } else if (main.includes("rain")) {
      return {
        background: "from-blue-800 via-blue-400 to-sky-200",
        glow: "bg-blue-300"
      };
    } else {
      return {
        background: "from-blue-400 via-white to-blue-100",
        glow: "bg-sky-300"
      };
    }
  };
  