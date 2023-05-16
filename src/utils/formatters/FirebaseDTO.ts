export const FirebaseDTO = {
    receive: (data:any) => {
      let reqArr = [];
      let reqVal = data;
      for (let key in reqVal) {
        reqArr.push({ ...reqVal[key], key: key});
      }
      return reqArr;
    },
    send: (data:any) => {
      return {
        name: data
      };
    },
    create: (data:any) => {
      return {
        name: data.name
      };
    }
    
  };
  

  
  