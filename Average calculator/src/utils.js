import axios from 'axios';

export const fetchNumbersWithTimeout = async (url, timeout = 500) => {
  try {
    const response = await Promise.race([
      axios.get(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
      ),
    ]);

    if (response?.data?.numbers && Array.isArray(response.data.numbers)) {
      return response.data.numbers;
    }
  } catch (err) {
    console.error('Fetch failed:', err.message);
  }
  return [];
};
