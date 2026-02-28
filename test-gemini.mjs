import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC0KbcvX75SoJpdOwIg9bJKZIOr_RA_VI4");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

const result = await model.generateContent("Say hello in one sentence.");
console.log(result.response.text());