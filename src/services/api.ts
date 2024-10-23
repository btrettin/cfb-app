export async function saveWeeksInServer() {
  try {
    const response = await fetch(`/api/games`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Parse JSON from the response
  } catch (error) {}
}

export async function getWeekTerritories(week: number) {
  try {
    const response = await fetch(`/api/territory/week/${week}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Parse JSON from the response
  } catch (error) {}
}
