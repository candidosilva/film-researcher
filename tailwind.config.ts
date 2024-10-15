import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      roboto: ["roboto", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  // safelist: ["hidden", "text-red-500", "text-yellow-500", "text-green-500"],
};
