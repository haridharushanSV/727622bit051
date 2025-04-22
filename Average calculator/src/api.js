const BASE_URL = 'https://20.244.56.144/evaluation-service/';
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ1MzA2MTU1LCJpYXQiOjE3NDUzMDU4NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZlOTA2OGVlLTVmM2UtNDhlNS04YWIxLWRhMjE0NmY0OTBkYyIsInN1YiI6InN2aGFyaXNhcmF2YW5hbkBnbWFpbC5jb20ifSwiZW1haWwiOiJzdmhhcmlzYXJhdmFuYW5AZ21haWwuY29tIiwibmFtZSI6ImhhcmlkaGFydXNoYW4gcyB2Iiwicm9sbE5vIjoiNzI3NjIyYml0MDUxIiwiYWNjZXNzQ29kZSI6Imp0QnV6dSIsImNsaWVudElEIjoiNmU5MDY4ZWUtNWYzZS00OGU1LThhYjEtZGEyMTQ2ZjQ5MGRjIiwiY2xpZW50U2VjcmV0Ijoid2tiTnBNTXBoVmtCa1duUiJ9.OcVvd66u0deS0zt-HeMECZUV1_3X0KS8sWLrh-U5m9s"; // paste 

export const fetchAverageData = async (numberType) => {
  const endpointMap = {
    p: "primes",
    f: "fibo",
    e: "even",
    r: "rand",
  };

  const endpoint = endpointMap[numberType];
  if (!endpoint) {
    console.error("Invalid number type!");
    return null;
  }

  const headers = new Headers();
  headers.append("Authorization", AUTH_TOKEN);

  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const apiUrl = `${BASE_URL}/${endpoint}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 500); 

    const response = await fetch(apiUrl, {
      ...requestOptions,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await response.text();
    console.log("Raw Response Text:", text);

    const parsed = JSON.parse(text); 

    const numbers = parsed.numbers || [];
    const avg =
      numbers.length > 0
        ? (numbers.reduce((sum, num) => sum + num, 0) / numbers.length).toFixed(2)
        : "0.00";

    return {
      windowPrevState: [],
      windowCurrState: numbers,
      numbers,
      avg,
    };
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return null;
  }
};
