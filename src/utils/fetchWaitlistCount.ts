// Utility to fetch the waitlist count from SheetDB
export async function fetchWaitlistCount(): Promise<number> {
  try {
    const res = await fetch('https://sheetdb.io/api/v1/xmuhjl9b6diln');
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.length;
    }
    return 100; // fallback
  } catch {
    return 100; // fallback
  }
}
