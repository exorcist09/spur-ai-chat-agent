import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global Error:", err);

  const errorMessage = err.message || "";
  const statusCode = err.status || err.statusCode || 500;

  // 1. Rate Limiting (429)
  if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota") || errorMessage.toLowerCase().includes("rate limit")) {
    res.status(429).json({ success: false, message: "Rate limit reached. Please try again in a moment." });
    return;
  }
  
  // 2. Invalid API Key (503)
  if (errorMessage.includes("403") || errorMessage.includes("API key not valid") || errorMessage.toLowerCase().includes("api key") || errorMessage.toLowerCase().includes("unauthorized")) {
    res.status(503).json({ success: false, message: "The AI service is temporarily unavailable. Please try again later." });
    return;
  }

  // 3. Timeout (504)
  if (errorMessage.includes("504") || errorMessage.toLowerCase().includes("timeout") || errorMessage.toLowerCase().includes("timed out") || errorMessage.toLowerCase().includes("abort")) {
    res.status(504).json({ success: false, message: "The request timed out. Please try again." });
    return;
  }

  // 4. Bad Request (400)
  if (errorMessage.includes("400") || statusCode === 400) {
    res.status(400).json({ success: false, message: err.message || "Bad Request" });
    return;
  }

  // 5. Other API error (502) -> Assuming it's from an external API if it has a specific non-500 status, or mention of 'fetch'
if ((statusCode > 400 && statusCode !== 500) || errorMessage.toLowerCase().includes("fetch")) {
  res.status(502).json({
    success: false,
    message: "An upstream AI service error occurred. Please try again later.",
  });
  return;
}

  // 6. Generic Fallback (500)
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};