function App() {

  async function print() {
    const res = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q={Weston},{FL},{US}&appid={87260a6c3d87520ec68da8d6e238d658}"
    );

    const data = await res.json();
    return data;
  }

  return (
    <>
      {print()}
      <p>asdf</p>
    </>
  )
}

export default App
