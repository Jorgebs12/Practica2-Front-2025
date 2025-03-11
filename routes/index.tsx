export default function Home() {
  return (
    <div>
      <div>
        <h1>Star Wars</h1>
      </div>
     <form method="GET" action="/personaje">
          Busca a tu personaje Star Wars 
          <input name="search" type="text" />
          <button type="submit">Buscar</button>
      </form> 
    </div>
  );
}
