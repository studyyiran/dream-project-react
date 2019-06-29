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

ajax.delete = function(url, data) {
  return ajax.fetch({
    url,
    method: "DELETE",
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
        console.log(res);
        if (res.ok) {
          const result = res.json();
          resolve(result);
        } else {
          console.error("网络故障，500吗？");
          console.error(res);
          reject(res);
        }
      })
      .catch(e => {
        console.log(e);
        console.error("网络故障，底层catch。network？404?");
        console.error(e);
      });
  });
};

export default ajax;
