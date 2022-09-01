
export const getAPI = (url,disPatchFn)=> {
    fetch(url)
    .then(res=>res.json()).then(data=>disPatchFn(data))
    .catch(err=>console.log('error', err))
}