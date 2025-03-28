async function getArrests() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json')
    if (response.status != 200) {
      throw new Error(response)
    } else {
      const data = await response.json()
      return data
    }
  } catch (error) {
    alert('error fetching arrest data')
  }
}

export { getArrests }
