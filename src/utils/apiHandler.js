let getApiResponse = async (url, method, headers, body) => {
  let response = await (await fetch(url, { method, headers, body })).json()
  return response
}

export { getApiResponse }
