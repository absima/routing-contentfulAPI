import { createClient } from "contentful";


const fetcher = () => { 

  const client = createClient({
    space: import.meta.env.VITE_SPACE,
    accessToken: import.meta.env.VITE_TOKEN,
    host: import.meta.env.VITE_HOST
  });

  const getItem = async(contype) => {
    try {
      const contentx = await client.getEntries(
      {
        content_type: contype,
        select: "fields" 
      });
      // console.log('continents----', continents.items)
      const contentEntries = contentx.items.map((item) => 
      {
        const images = item.fields.images.map(item => item.fields.file);
        images.unshift(item.fields.image.fields.file);
        const overview = item.fields.overview; //////
        return { ...item.fields, images, overview };
      });
      return [contentEntries, null];
    }
    catch (error) {
      return [null, error];
    }
  }

  const getData = async () => {
    const contype = 'continent';
    const dta = await getItem(contype);
    const contIds = ['africa', 'asia', 'europe', 'northAmerica', 'oceania', 'southAmerica'];
    const contNames = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
    const nmID = contIds.map(x => x.substring(0,4).toUpperCase());
    if (dta.length){
      for (let i=0; i<6; i++){
        const nme = dta[0][i].name.substring(0,4).toUpperCase();
        const idx = nmID.indexOf(nme);
        const dtaItem = await getItem(contIds[idx]);
        if (dtaItem.length){
          dta[0][i]['selected'] = dtaItem;
        }        
      }
    }
    // console.log('-----------')
    // console.log('processed dtaaaaaaaaa at fetched.js', dta)
    // console.log('++++++++++++')
    return dta

  }
  return { getData };
}

export default fetcher;
