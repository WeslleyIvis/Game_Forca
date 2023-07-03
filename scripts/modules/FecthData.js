export default class FecthData {
  async data(url) {
    const data = await fetch(url)
      .then((r) => r.json())
      .catch((err) => {
        error: err;
      });

    return data;
  }
}
