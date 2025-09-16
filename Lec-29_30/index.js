require("dotenv").config();
const main = require("./chat/aiChat");
const readlineSync = require("readline-sync");
const weatherData = require("./get-weather");

const userPrompt = readlineSync.question(
  "Which city weather you want to know? ---->  "
);

const professionalPrompt = `
# ROLE
You are a highly intelligent Natural Language Understanding (NLU) model acting as the brain for a weather application.

# OBJECTIVE
Your primary goal is to analyze a user's query and perform one of two tasks:
1.  Extract location and date information to fetch weather data.
2.  Generate a user-friendly weather summary if weather data is provided.
You MUST respond strictly in JSON format without any additional text or explanations.

# INSTRUCTIONS & LOGIC
1.  **Analyze the User Input:** Carefully examine the user's query provided under "USER_QUERY_TO_PROCESS".
2.  **Identify the Task:**
    * If the query is a question asking for weather information, your task is to extract entities. Use "SCHEMA A".
    * If the context includes pre-fetched weather data and asks for a summary, your task is to generate a report. Use "SCHEMA B".
3.  **Entity Extraction Rules (for SCHEMA A):**
    * **Location:** Identify all city names mentioned.
    * **Date:**
        * If the user asks for today's weather, use the string "today".
        * For any future date (e.g., "tomorrow", "next Friday", "April 30th"), convert it to the absolute "YYYY-MM-DD" format. (Current Date: 2025-09-16).
        * If no date is mentioned, assume "today".

# OUTPUT JSON SCHEMAS

## SCHEMA A: For Weather Data Request
- Use this when you need to provide location and date details to fetch weather.
- The "location" field must be an array, even for a single city.
{
  "weather_details_needed": true,
  "location": [{"city": "mumbai", "date": "today"}, {"city": "delhi", "date": "2025-09-17"}]
}

## SCHEMA B: For Weather Report Summary
- Use this ONLY when you are given weather details and asked to summarize them.
- The report should be in a friendly, conversational Hinglish tone.
{
  "weather_details_needed": false,
  "weather_report": "Bhai Delhi ka mausam toh badiya hai, 18 degree temperature hai, ghar pe pakode bana lo, maja aayega khaane mein"
}


# CONSTRAINTS
- ALWAYS respond in valid JSON format.
- DO NOT include any text outside of the JSON object.
- If no city or date can be reliably extracted from the user's query, return SCHEMA A with an empty "location" array:"{"weather_details_needed": true, "location": []}".

# USER_QUERY_TO_PROCESS
${userPrompt}
`;

async function aiAgent() {
  try {
    let rawData = await main(professionalPrompt);
    rawData = rawData.trim();
    rawData = rawData.replace(/^```json\s*|```$/g, "").trim();
    rawData = JSON.parse(rawData);

    const weatherDetails = await weatherData(rawData.location);

    const answer = [];

    if (weatherDetails.length > 0) {
      for (let data of weatherDetails) {
        const weatherReportPrompt = `
# ROLE & GOAL
You are an expert data interpreter. Your goal is to parse a string containing a JavaScript Object literal (from a weather API) and transform its data into a clear, engaging, and human-readable weather report suitable for a major newspaper.

# TASK
1.  **Interpret the JS Object String:** The data provided in the "JS_OBJECT_DATA_STRING" section is a string representing a JavaScript Object. Critically, the keys in this object may be unquoted and string values may use single quotes (e.g., "{ key: 'value' }"). Your first step is to correctly parse this structure to access the data within. Do not treat it as strict JSON.
2.  **Extract Key Information:** Once interpreted, analyze the data structure. Sift through it to find the most relevant meteorological information (temperature, conditions, wind, humidity, etc.).
3.  **Interpret and Convert:** Translate the technical data into understandable terms. This includes:
    * Converting temperature from Kelvin to Celsius ($C = K - 273.15$).
    * Interpreting the general weather condition from the 'weather' array.
    * Describing wind direction (e.g., 'deg: 260' becomes 'from the west').
    * Converting Unix timestamps for sunrise/sunset to a readable time format (e.g., HH:MM AM/PM).
4.  **Compose the Report:** Write a cohesive report in the style of a newspaper article, following the structure and tone requirements below. Base the report strictly on the provided data.

# INPUT DATA FORMAT
The input will be a single string containing the structure of a JavaScript Object literal. Keys may not be quoted.

# REPORT STYLE & STRUCTURE REQUIREMENTS
* **Headline:** Create a short, catchy, and informative headline.
* **Opening Summary:** Begin with a one or two-sentence paragraph that gives a general overview of the weather for the day.
* **Detailed Body:** Elaborate on temperature, sky conditions, wind, and humidity.
* **Tone:** Professional, informative, and clear.

# EXAMPLE
---
## INPUT: JS_OBJECT_DATA_STRING
"{weather:[{id:803,main:'Clouds',description:'broken clouds'}],main:{temp:305.15,feels_like:309.5,temp_min:303.15,temp_max:306.15,humidity:58},wind:{speed:5.1,deg:260},name:'New Delhi',sys:{country:'IN',sunrise:1694824200,sunset:1694868600}}"

## OUTPUT: The Generated Report
New Delhi to See a Warm Day Under Broken Clouds:

Residents of New Delhi can expect a warm and humid day ahead, with temperatures hovering around 32°C, though with the humidity, it may feel closer to 36°C. The low for the night is expected to be a comfortable 30°C.

Skies will be filled with broken clouds throughout the day, offering intermittent periods of sunshine. A steady breeze will be coming in from the west at approximately 18 km/h, providing some relief from the heat. Humidity levels will remain moderately high at around 58%.

The sun will rise early at 5:50 AM, setting later in the evening at 6:10 PM.
---

# START OF TASK

## INPUT: JS_OBJECT_DATA_STRING
${JSON.stringify(data)}

## OUTPUT: The Generated Report
`;

        let weatherReport = await main(JSON.stringify(weatherReportPrompt));

        answer.push(weatherReport);
      }
    }

    if (answer.length > 0) {
      console.log("Your weather report is ----> ");

      for (const report of answer) {
        console.log("");
        console.log(report);
        console.log("");
      }
    } else {
      throw new Error(
        "No prompt provided, please provide the city & date for which you want to know weather report."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

aiAgent();
