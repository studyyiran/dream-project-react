const ajax = {};
ajax.post = function(url, data) {
  return ajax.fetch({
    url,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  });
};

ajax.put = function(url, data) {
  return ajax.fetch({
    url,
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  });
};

ajax.get = function(url) {
  return ajax.fetch({
    url,
    method: "GET"
  });
};

ajax.wrapper = function(func) {
  return func;
};

ajax.fetch = function(config) {
  const { url, ...otherConfig } = config;
  return new Promise((resolve, reject) => {
    fetch(url, otherConfig)
      .then(res => {
        const result = res.json();
        // result.then((res) => {
        //   console.log(res)
        //   resolve(res)
        // })
        // console.log(result)
        if (true) {
          resolve(result);
        } else {
          reject(res);
        }
      })
      .catch(e => {
        console.error(e);
      });
  });
};

export default ajax;
