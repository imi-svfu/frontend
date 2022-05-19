export const query = (id) => {
  return (`[out:json];
       way(` + id + `);
       out ids geom;`
  )
}
